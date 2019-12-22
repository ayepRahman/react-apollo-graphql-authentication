/**
 * React Hook Form with custom inputs
 * https://codesandbox.io/s/72j69vnk1x
 */

import React from 'react';
import styled from 'styled-components';
import useForm from 'react-hook-form';
import { Input, Button, message } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import ErrorMessage from 'app/components/ErrorMessage';
import { CREATE_TODO, GET_TODOS } from './gql';
import { fieldNames } from './enumerations';
import { createTodoValidationSchema } from './validations';

const CreateTodosForm = styled.form`
  display: flex;
  padding-bottom: 1rem;

  div {
    margin-right: 1rem;
    width: 100%;
  }
`;

const CreateTodos: React.FC<{}> = () => {
  const { register, handleSubmit, setValue, errors } = useForm({
    validationSchema: createTodoValidationSchema,
  });

  const [createTodos, { loading }] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  React.useEffect(() => {
    register({ name: fieldNames.task });
  });

  const onFormSubmit = (values: any) => {
    createTodos({
      variables: {
        task: values[fieldNames.task],
        checked: false,
      },
    });
  };

  return (
    <CreateTodosForm onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <Input
          data-testid="task-input"
          onChange={e => setValue('task', e.target.value)}
          name={fieldNames.task}
          placeholder="Add more task...."
        />
        <ErrorMessage errors={errors} name={fieldNames.task} />
      </div>
      <Button data-testid="create-button" type="primary" htmlType="submit" loading={loading}>
        Add Task
      </Button>
    </CreateTodosForm>
  );
};

export default CreateTodos;
