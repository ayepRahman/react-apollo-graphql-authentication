import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Input, Button, message as antdMessage } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { validationSchema } from './validations';
import { fieldNames } from './enumerations';
import { LOGIN } from './gql';
import ErrorMessage from 'app/components/ErrorMessage';
import Spacing from 'app/components/Spacing';
import { Title, Subtitle } from 'app/components/Typography';
import useAuthUser from 'hooks/useAuthUser';

export const LoginForm: React.FC = () => {
  const { setAuthUser } = useAuthUser();
  const { handleSubmit, errors, control } = useForm({
    validationSchema,
    mode: 'onChange',
  });

  const [login, { loading: isLogining, error, data: loginData }] = useMutation(LOGIN);

  React.useEffect(() => {
    if (loginData) {
    }
  }, [loginData]);

  React.useEffect(() => {
    if (error) {
      antdMessage.error(error.message);
    }
  }, [error]);

  const onFormSubmit = async (values: any) => {
    const { userName, password } = values;
    const response = await login({
      variables: {
        username: userName,
        password,
      },
    });
    if (response) {
      const token = response && response.data && response.data.login && response.data.login.token;
      if (token) {
        setAuthUser(token);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Title>Log in in to your account</Title>
      <Subtitle>Continue Log in to your account, so you can continue building cool stuff!</Subtitle>
      <Spacing margin="0 0 8px 0">
        <Controller
          name={fieldNames.userName}
          control={control}
          as={<Input placeholder="Username" />}
        />
        <ErrorMessage errors={errors} name={fieldNames.userName} />
      </Spacing>
      <Spacing margin="0 0 16px 0">
        <Controller
          name={fieldNames.password}
          control={control}
          as={<Input type="password" placeholder="Username" />}
        />
        <ErrorMessage errors={errors} name={fieldNames.password} />
      </Spacing>
      <Spacing>
        <Button block type="primary" htmlType="submit" loading={isLogining}>
          Log in
        </Button>
      </Spacing>
    </form>
  );
};

export default LoginForm;
