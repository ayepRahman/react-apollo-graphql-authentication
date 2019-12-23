/*
 * GQL
 * A JavaScript template literal tag that parses GraphQL query strings into the standard GraphQL AST.
 *
 */

import gql from 'graphql-tag';

export const GET_HOME = gql`
  query {
    getHome {
      id
      task
      checked
    }
  }
`;

export const CREATE_HOME = gql`
  mutation CreateHomes($task: String!, $checked: Boolean!) {
    createHomes(task: $task, checked: $checked) {
      id
      task
      checked
    }
  }
`;

export const DELETE_HOME = gql`
  mutation DeleteHome($id: ID!) {
    deleteHomeById(id: $id) {
      task
    }
  }
`;

export const UPDATE_HOME = gql`
  mutation UpdateHome($task: String!, $id: ID!, $checked: Boolean!) {
    updateHomesById(task: $task, id: $id, checked: $checked) {
      task
    }
  }
`;
