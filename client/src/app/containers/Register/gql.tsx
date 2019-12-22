/*
 * GQL
 * A JavaScript template literal tag that parses GraphQL query strings into the standard GraphQL AST.
 *
 */

import gql from 'graphql-tag';

export const GET_REGISTER = gql`
  query {
    getRegister {
      id
      task
      checked
    }
  }
`;

export const CREATE_REGISTER = gql`
  mutation CreateRegisters($task: String!, $checked: Boolean!) {
    createRegisters(task: $task, checked: $checked) {
      id
      task
      checked
    }
  }
`;

export const DELETE_REGISTER = gql`
  mutation DeleteRegister($id: ID!) {
    deleteRegisterById(id: $id) {
      task
    }
  }
`;

export const UPDATE_REGISTER = gql`
  mutation UpdateRegister($task: String!, $id: ID!, $checked: Boolean!) {
    updateRegistersById(task: $task, id: $id, checked: $checked) {
      task
    }
  }
`;