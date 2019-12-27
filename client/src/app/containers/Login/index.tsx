/**
 *
 * Login
 *
 */

import React from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
// import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { Input, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { validationSchema } from './validations';
import { fieldNames } from './enumerations';
import { GET_LOGIN, CREATE_LOGIN } from './gql';
import Card from 'app/components/Card';
import Spacing from 'app/components/Spacing';
import { Title, Subtitle } from 'app/components/Typography';
import styled from 'styled-components';

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
        <Title>Log in in to your account</Title>
        <Subtitle>
          Continue Log in to your account, so you can continue building cool stuff!
        </Subtitle>
        <Spacing margin="0 0 8px 0">
          <Input
            onChange={e => setValue(fieldNames.userName, e.target.value)}
            name={fieldNames.userName}
            placeholder="Username"
          />
        </Spacing>
        <Spacing margin="0 0 16px 0">
          <Input
            onChange={e => setValue(fieldNames.password, e.target.value)}
            name={fieldNames.password}
            placeholder="Password"
          />
        </Spacing>
        <Spacing>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
        </Spacing>
      </form>
    );
  };

  return (
    <Spacing margin="0 5rem" display="flex" justify="center" height="100vh" align="center">
      <Form />
    </Spacing>
  );
};

export default Login;
