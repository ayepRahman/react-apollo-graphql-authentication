import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MockedProvider, MockedProviderProps } from '@apollo/react-testing';
import { ThemeProvider } from 'styled-components';
import ListsTodos from '../ListsTodos';
import { GET_TODOS } from '../gql';
import theme from 'styles/theme';

beforeAll(cleanup);

const defaultProps = {};

const renderComponent = ({ mocks, props }: MockedProviderProps & { props?: any }) =>
  render(
    <MockedProvider addTypename={false} mocks={mocks}>
      <ThemeProvider theme={theme}>
        <ListsTodos {...defaultProps} {...props} />
      </ThemeProvider>
    </MockedProvider>
  );

describe('ListTodos', () => {
  it('should render loader when on load', async () => {
    const { getByTestId } = renderComponent({});
    expect(getByTestId('full-page-loader')).toBeInTheDocument();
  });

  it('should render network error', async () => {
    const mocks = [
      {
        request: {
          query: GET_TODOS,
        },
        error: new Error('Awww shucks!'),
      },
    ];

    const { findByText, debug } = renderComponent({ mocks });
    const errorMessage = await findByText('Network error: Awww shucks!');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should render empty container when there no data', async () => {
    const mocks = [
      {
        request: {
          query: GET_TODOS,
        },
        result: {
          data: {
            getTodos: [],
          },
        },
      },
    ];

    const { findByTestId, debug } = renderComponent({ mocks });
    const text = await findByTestId('empty-container');
    expect(text).toBeInTheDocument();
  });

  it('should render todos when successfully calling of query', async () => {
    const mocks = [
      {
        request: {
          query: GET_TODOS,
        },
        result: {
          data: {
            getTodos: [
              {
                id: 1,
                task: 'Oculus',
                checked: true,
              },
              {
                id: 2,
                task: 'Iphone 11',
                checked: true,
              },
            ],
          },
        },
      },
    ];

    const { findByText, debug } = renderComponent({ mocks });
    const textOne = await findByText('Oculus');
    const textTwo = await findByText('Iphone 11');

    expect(textOne).toBeInTheDocument();
    expect(textTwo).toBeInTheDocument();
  });
});
