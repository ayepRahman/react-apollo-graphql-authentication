import gql from 'graphql-tag';

export const GET_TODOS = gql`
  query {
    getTodos {
      id
      task
      checked
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodos($task: String!, $checked: Boolean!) {
    createTodos(task: $task, checked: $checked) {
      id
      task
      checked
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodoById(id: $id) {
      task
    }
  }
`;

export const UPDATE_TODOS = gql`
  mutation UpdateTodo($task: String!, $id: ID!, $checked: Boolean!) {
    updateTodosById(task: $task, id: $id, checked: $checked) {
      task
    }
  }
`;
