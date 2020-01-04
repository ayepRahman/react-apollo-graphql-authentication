/**
 *
 * Register
 *
 */

import React from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useDebouncedCallback } from 'use-debounce';
import { useHistory } from 'react-router-dom';
import { Input, Button, message as antdMessage } from 'antd';
import { useForm } from 'react-hook-form';
import { validationSchema } from './validations';
import { fieldNames } from './enumerations';
import { REGISTER, USER_NAME_AUTOCOMPLETE } from './gql';
import Spacing from 'app/components/Spacing';
import { Title, Subtitle } from 'app/components/Typography';
import ErrorMessage from 'app/components/ErrorMessage';
import Message from 'app/components/Message';
import { LOCAL_STORAGE_TEMPLATE, ROUTES } from 'enumerations';
import { GoogleLogin } from 'react-google-login';

const { Search } = Input;

export const Register: React.FC = () => {
  const Form = () => {
    const history = useHistory();
    const [userNameIsAvailable, setUserNameIsAvailable] = React.useState<boolean>(false);
    const [autoComplete, { data: autoCompleteData, loading: isAutoCompleting }] = useLazyQuery(
      USER_NAME_AUTOCOMPLETE
    );
    const [registerUser, { loading: isRegisteting, error }] = useMutation(REGISTER);
    const { register, handleSubmit, setValue, errors } = useForm({
      validationSchema,
      mode: 'onBlur',
      reValidateMode: 'onSubmit',
    });
    const [debouncedCallback] = useDebouncedCallback((username: string) => {
      autoComplete({
        variables: {
          username,
        },
      });
    }, 1000);

    React.useEffect(() => {
      if (error) {
        antdMessage.error(error.message);
      }
    }, [error]);

    React.useEffect(() => {
      if (autoCompleteData) {
        const { userNameAutoComplete } = autoCompleteData;
        const ok: boolean = userNameAutoComplete && userNameAutoComplete.ok;
        setUserNameIsAvailable(ok);
      }
    }, [autoCompleteData]);

    React.useEffect(() => {
      Object.keys(fieldNames).forEach(key => {
        register({ name: key });
      });
    });

    const onFormSubmit = async (values: any) => {
      const { userName, email, password } = values;
      const response: any = await registerUser({
        variables: {
          username: userName,
          email,
          password,
        },
      });

      if (response) {
        const token =
          response && response.data && response.data.register && response.data.register.token;

        if (token) {
          // storing token in localStorage
          localStorage.setItem(LOCAL_STORAGE_TEMPLATE.token, token);
          history.push(ROUTES.dashboard);
        }
      }
    };

    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedCallback(e.target.value);
      setValue(fieldNames.userName, e.target.value);
    };

    const renderUserNameAvailability = () => {
      return (
        <>
          {userNameIsAvailable ? (
            <Message color="success">
              <span role="img" aria-label="success">
                ✅
              </span>
              User name is available!
            </Message>
          ) : (
            <Message color="error">
              <span role="img" aria-label="error">
                ❌
              </span>
              User name is already in use!
            </Message>
          )}
        </>
      );
    };

    return (
      <>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Title>Sign up for an Account</Title>
          <Subtitle>
            Let's get you all set up so you can start creating you unique onboarding experience
          </Subtitle>
          <Spacing margin="0 0 16px 0">
            <Search
              onChange={onChangeUserName}
              name={fieldNames.userName}
              placeholder="User Name"
              loading={isAutoCompleting}
              enterButton
            />
            {autoCompleteData ? renderUserNameAvailability() : null}
            <ErrorMessage errors={errors} name={fieldNames.userName} />
          </Spacing>
          <Spacing margin="0 0 16px 0">
            <Input
              onChange={e => setValue(fieldNames.email, e.target.value)}
              name={fieldNames.email}
              placeholder="Email"
            />
            <ErrorMessage errors={errors} name={fieldNames.email} />
          </Spacing>
          <Spacing margin="0 0 16px 0">
            <Input
              type="password"
              onChange={e => setValue(fieldNames.password, e.target.value)}
              name={fieldNames.password}
              placeholder="Password"
            />
            <ErrorMessage errors={errors} name={fieldNames.password} />
          </Spacing>
          <Spacing margin="0 0 16px 0">
            <Input
              type="password"
              onChange={e => setValue(fieldNames.confirmPassword, e.target.value)}
              name={fieldNames.confirmPassword}
              placeholder="Confirm Password"
            />
            <ErrorMessage errors={errors} name={fieldNames.confirmPassword} />
          </Spacing>
          <Button block type="primary" htmlType="submit" loading={isRegisteting}>
            Sign up
          </Button>
          <Spacing margin="8px 0 0">
            <GoogleLogin
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={reponse => console.log(reponse)}
              onFailure={reponse => console.log(reponse)}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <Button icon="google" block type="danger" onClick={renderProps.onClick}>
                  Login with Google
                </Button>
              )}
            />
          </Spacing>
        </form>
      </>
    );
  };

  return (
    <Spacing margin="0 5rem" display="flex" justify="center" height="100vh" align="center">
      <Form />
    </Spacing>
  );
};

export default Register;
