/**
 *
 * Register
 *
 */

import React from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { Input, Button } from 'antd';
import useForm from 'react-hook-form';
import { validationSchema } from './validations';
import { fieldNames } from './enumerations';
import { GET_REGISTER, CREATE_REGISTER } from './gql';
import Card from 'app/components/Card';
import Spacing from 'app/components/Spacing';
import styled from 'styled-components';
import { Title, Subtitle } from 'app/components/Typography';

const RegisterContainer = styled.div``;

/**
 * TODO:
 * - username autocomplete, to check if user name is available in db
 * - password
 * - confirmPassword
 * - redirect to login
 */

// @dev return function that you can call to execute query
export const LazyGetRegister = () => {
  const [getTodos, { loading, error, data }] = useLazyQuery(GET_REGISTER);

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

export const CreateRegister = () => {
  const [createTodo, { loading, error, data }] = useMutation(CREATE_REGISTER);

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

export const Register: React.FC = () => {
  const { register, handleSubmit, setValue, errors, reset } = useForm({
    validationSchema,
    defaultValues: {
      firstName: 'bill',
      lastName: 'luo',
      password: '123123123',
      confirmPassword: '123123123',
      email: 'bluebill1049@hotmail.com',
      website: 'www.google.com',
      pets: ['dog', 'cat'],
    },
  });

  console.log(errors);

  React.useEffect(() => {
    Object.keys(fieldNames).forEach(key => {
      register({ name: key });
    });
  });

  const onFormSubmit = (values: any) => {
    console.log(values);
  };

  const Form = () => {
    return (
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Title>Sign up for an Account</Title>
        <Subtitle>
          Let's get you all set up so you can start creating you unique onboarding experience
        </Subtitle>
        <Spacing margin="0 0 16px 0">
          <Input
            onChange={e => setValue(fieldNames.userName, e.target.value)}
            name={fieldNames.userName}
            placeholder="Username"
          />
        </Spacing>
        <Spacing margin="0 0 16px 0">
          <Input
            onChange={e => setValue(fieldNames.email, e.target.value)}
            name={fieldNames.email}
            placeholder="Email"
          />
        </Spacing>
        <Spacing margin="0 0 16px 0">
          <Input
            onChange={e => setValue(fieldNames.password, e.target.value)}
            name={fieldNames.password}
            placeholder="Password"
          />
        </Spacing>
        <Spacing margin="0 0 16px 0">
          <Input
            onChange={e => setValue(fieldNames.confirmPassword, e.target.value)}
            name={fieldNames.confirmPassword}
            placeholder="Confirm Password"
          />
        </Spacing>
        <Button block type="primary" htmlType="submit">
          Sign up
        </Button>
      </form>
    );
  };

  return (
    <Spacing margin="0 5rem" display="flex" justify="center" height="100vh" align="center">
      <Form />
    </Spacing>
  );
};

export default Register;
