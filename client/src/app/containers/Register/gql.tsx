/*
 * GQL
 * A JavaScript template literal tag that parses GraphQL query strings into the standard GraphQL AST.
 *
 */

import gql from 'graphql-tag';

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const USER_NAME_AUTOCOMPLETE = gql`
  query AutoComplete($username: String!) {
    userNameAutoComplete(username: $username) {
      ok
      message
    }
  }
`;
