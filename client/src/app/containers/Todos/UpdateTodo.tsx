import React from 'react';
import { Checkbox } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { GET_TODOS, UPDATE_TODOS } from './gql';

const UpdateTodo = ({ todo }: { todo: { id: string; task: string; checked: boolean } }) => {
  const [updateTodos] = useMutation(UPDATE_TODOS, { refetchQueries: [{ query: GET_TODOS }] });
  const handleChecked = (event: any, todo: object) => {
    console.log('handleChecked', { event, todo });

    updateTodos({
      variables: {
        ...todo,
        checked: event.target.checked,
      },
    });
  };

  return (
    <Checkbox
      name="checked"
      checked={todo.checked}
      onChange={event => handleChecked(event, todo)}
    />
  );
};

export default UpdateTodo;
