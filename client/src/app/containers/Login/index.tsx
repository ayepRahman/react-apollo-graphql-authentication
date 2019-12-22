/**
 *
 * Login
 *
 */

import React from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
// import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { Input, Button } from 'antd';
import useForm from 'react-hook-form';
import { validationSchema } from './validations';
import { fieldNames } from './enumerations';
import { GET_LOGIN, CREATE_LOGIN } from './gql';
import styled from 'styled-components';

// const LoginContainer = styled.div``;

// @dev return function that you can call to execute query
export const LazyGetLogin = () => {
  const [getTodos, { loading, error, data }] = useLazyQuery(GET_LOGIN);

  React.useEffect(() => {
    getTodos({
      variables: {
        name: 'John Doe',
      },
    });
  }, []);

  if (loading) return <div>...loading</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;
  return <div>{JSON.stringify(data)}</div>;
};

export const CreateLogin = () => {
  const [createTodo, { loading, error, data }] = useMutation(CREATE_LOGIN);

  if (loading) return <div>...Loading</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;
  return (
    <div>
      <button
        onClick={() =>
          createTodo({
            variables: { task: 'Buy Something', checked: true },
          })
        }
      >
        Add Todo
      </button>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export const Login: React.FC = () => {
  const { register, handleSubmit, setValue, errors, reset } = useForm({
    validationSchema,
  });

  console.log(errors);

  React.useEffect(() => {
    Object.keys(fieldNames).forEach(key => {
      register({ name: key });
    });
  }, [register]);

  const onFormSubmit = (values: any) => {
    console.log(values);
  };

  const Form = () => {
    return (
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Input
          onChange={e => setValue(fieldNames.userName, e.target.value)}
          name={fieldNames.userName}
          placeholder="Username"
        />
        <Input
          onChange={e => setValue(fieldNames.password, e.target.value)}
          name={fieldNames.password}
          placeholder="Password"
        />
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </form>
    );
  };

  return (
    <div>
      <Form />
    </div>
  );
};

export default Login;
