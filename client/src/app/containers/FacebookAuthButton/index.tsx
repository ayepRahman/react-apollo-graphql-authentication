/**
 *
 * FacebookAuthButton
 *
 */

import React from 'react';
import { Button } from 'antd';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useMutation } from '@apollo/react-hooks';
import useAuthUser from 'hooks/useAuthUser';
import { FACEBOOK_AUTH } from './gql';
import { FACEBOOK_APP_ID } from 'constants/index';
import styled from 'styled-components';

const FacebookButton = styled(Button)`
  && {
    background-color: ${p => p.theme.colors.facebook};
    border-color: ${p => p.theme.colors.facebook};

    :active {
      background-color: ${p => p.theme.colors.facebook};
      border-color: ${p => p.theme.colors.facebook};
    }

    :hover {
      background-color: ${p => p.theme.colors.facebook};
      border-color: ${p => p.theme.colors.facebook};
    }
  }
`;

export const FacebookAuthButton: React.FC = ({ children }) => {
  const { setAuthUser } = useAuthUser();
  const [isLoading, setIsLoading] = React.useState(false);
  const [facebookAuth, { error, data }] = useMutation(FACEBOOK_AUTH);

  React.useEffect(() => {
    if (data && data.facebookAuth && data.facebookAuth.token) {
      setIsLoading(false);
      setAuthUser(data.facebookAuth.token);
    }
  }, [data, setAuthUser]);

  React.useEffect(() => {
    if (error) {
      console.log('FacebookAuthButton error', error);
      setIsLoading(false);
    }
  }, [error]);

  const handleResponse = async (response: any) => {
    console.log('FACEBOOK response', response);
    const { accessToken } = response;

    facebookAuth({
      variables: {
        accessToken,
      },
    });
  };

  const handleClick = (event: any, renderProps: any) => {
    event.preventDefault();
    renderProps.onClick(event);
    setIsLoading(true);
  };

  return (
    <FacebookLogin
      appId={FACEBOOK_APP_ID}
      autoLoad={false}
      callback={handleResponse}
      render={(renderProps: any) => (
        <FacebookButton
          icon="facebook"
          block
          type="primary"
          onClick={event => handleClick(event, renderProps)}
          loading={isLoading}
        >
          {children}
        </FacebookButton>
      )}
    />
  );
};

//

export default FacebookAuthButton;
