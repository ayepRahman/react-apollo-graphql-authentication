import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';
import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import { MockedProvider, MockedProviderProps } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import CreateTodos from '../CreateTodos';
import { CREATE_TODO } from '../gql';
import theme from 'styles/theme';

afterEach(cleanup);

const defaultProps = {};

const renderComponent = ({ mocks, props }: MockedProviderProps & { props?: any }) =>
  render(
    <MockedProvider addTypename={false} mocks={mocks}>
      <ThemeProvider theme={theme}>
        <CreateTodos {...defaultProps} {...props} />
      </ThemeProvider>
    </MockedProvider>
  );

describe('CreateTodos', () => {
  it('should render loading icon in button when submit of form', async () => {
    const mockReqPayload = {
      query: CREATE_TODO,
      variables: {
        task: 'Buy Tomato',
        checked: false,
      },
    };

    const mockResPayload = {
      data: {
        createTodos: [{ id: 1, task: 'Something else', checked: false }],
      },
    };

    const mocks = [
      {
        request: mockReqPayload,
        result: mockResPayload,
      },
    ];

    const { getByTestId } = renderComponent({ mocks });
    fireEvent.change(getByTestId('task-input'), { target: { value: 'Buy Tomato' } });
    const button = getByTestId('create-button');
    fireEvent.click(button);
    expect(getByTestId('create-button')).toHaveAttribute('ant-click-animating-without-extra-node');
  });
});
