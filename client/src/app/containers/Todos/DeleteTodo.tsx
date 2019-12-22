import React from 'react';
import { Icon } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { GET_TODOS, DELETE_TODO } from './gql';

const DeleteTodo = ({ id }: { id: string }) => {
  const [deleteTodo] = useMutation(DELETE_TODO, { refetchQueries: [{ query: GET_TODOS }] });
  const handleDelete = async () => {
    try {
      await deleteTodo({ variables: { id } });
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return <Icon type="delete" onClick={handleDelete} />;
};

export default DeleteTodo;
