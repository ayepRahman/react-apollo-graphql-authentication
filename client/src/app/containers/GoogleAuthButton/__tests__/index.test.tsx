/**
 *
 * Tests 
 * React testing library with React Apollo
 * @see https://www.apollographql.com/docs/react/development-testing/testing/
 * @see https://github.com/styled-components/jest-styled-components
 * @see https://www.apollographql.com/docs/react/development-testing/testing/
 *
 */

import '@testing-library/jest-dom/extend-expect'; 
import 'jest-styled-components';
import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider, MockedProviderProps } from '@apollo/react-testing';
import { GoogleAuthButton } from '../index';
// import { GET_TODOS, CREATE_TODOS } from '../gql'

const defaultProps = {}

const renderComponent = ({ mocks, props }: MockedProviderProps & { props?: any }) => render(
  <MockedProvider mocks={mocks}>
    <GoogleAuthButton {...defaultProps} {...props} />
  </MockedProvider>
)

describe('<GoogleAuthButton />', () => {
  it('should render on load', () => {
    const {} = renderComponent({})
  })
});
