/*
 * GQL
 * A JavaScript template literal tag that parses GraphQL query strings into the standard GraphQL AST.
 *
 */

import gql from 'graphql-tag';

export const GET_LOGIN = gql`
  query {
    getLogin {
      id
      task
      checked
    }
  }
`;

export const CREATE_LOGIN = gql`
  mutation CreateLogins($task: String!, $checked: Boolean!) {
    createLogins(task: $task, checked: $checked) {
      id
      task
      checked
    }
  }
`;

export const DELETE_LOGIN = gql`
  mutation DeleteLogin($id: ID!) {
    deleteLoginById(id: $id) {
      task
    }
  }
`;

export const UPDATE_LOGIN = gql`
  mutation UpdateLogin($task: String!, $id: ID!, $checked: Boolean!) {
    updateLoginsById(task: $task, id: $id, checked: $checked) {
      task
    }
  }
`;