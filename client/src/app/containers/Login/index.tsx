/**
 *
 * Login
 *
 */

import React from 'react';
import Spacing from 'app/components/Spacing';
import LoginForm from './LoginForm';
import GoogleAuthButton from 'app/containers/GoogleAuthButton';
import FacebookAuthButton from 'app/containers/FacebookAuthButton';

export const Login: React.FC = () => {
  return (
    <Spacing margin="0 5rem" display="flex" justify="center" height="100vh" align="center">
      <div>
        <LoginForm />
        <Spacing margin="8px 0">or</Spacing>
        <Spacing margin="8px 0 0">
          <GoogleAuthButton>Login with Google</GoogleAuthButton>
        </Spacing>
        <Spacing margin="8px 0 0">
          <FacebookAuthButton>Login with Facebook</FacebookAuthButton>
        </Spacing>
      </div>
    </Spacing>
  );
};

export default Login;
