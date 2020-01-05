import React, { useEffect, useState } from 'react';

interface IUseSocialAuth {
  onSuccess;
  clientId;
  cookiePolicy;
  loginHint;
  hostedDomain;
  autoLoad;
  isSignedIn;
  fetchBasicProfile;
  redirectUri;
  discoveryDocs;
  onFailure;
  uxMode;
  scope;
  accessType;
  responseType;
  jsSrc;
  onRequest;
  prompt;
}

const useGoogleLogin = ({
  onSuccess,
  clientId,
  cookiePolicy,
  loginHint,
  hostedDomain,
  autoLoad,
  isSignedIn,
  fetchBasicProfile,
  redirectUri,
  discoveryDocs,
  onFailure,
  uxMode,
  scope,
  accessType,
  responseType,
  jsSrc,
  onRequest,
  prompt,
}) => {
  const [loaded, setLoaded] = useState(false);

  function handleSigninSuccess(res) {
    /*
      offer renamed response keys to names that match use
    */
    const basicProfile = res.getBasicProfile();
    const authResponse = res.getAuthResponse();
    res.googleId = basicProfile.getId();
    res.tokenObj = authResponse;
    res.tokenId = authResponse.id_token;
    res.accessToken = authResponse.access_token;
    res.profileObj = {
      googleId: basicProfile.getId(),
      imageUrl: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
      name: basicProfile.getName(),
      givenName: basicProfile.getGivenName(),
      familyName: basicProfile.getFamilyName(),
    };
    onSuccess(res);
  }

  function signIn(e: any) {
    if (e) {
      e.preventDefault(); // to prevent submit if used within form
    }
    if (loaded) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const options = {
        prompt,
      };
      onRequest();
      if (responseType === 'code') {
        auth2.grantOfflineAccess(options).then(
          res => onSuccess(res),
          err => onFailure(err)
        );
      } else {
        auth2.signIn(options).then(
          res => handleSigninSuccess(res),
          err => onFailure(err)
        );
      }
    }
  }

  useEffect(() => {
    loadScript(document, 'script', 'google-login', jsSrc, () => {
      const params = {
        client_id: clientId,
        cookie_policy: cookiePolicy,
        login_hint: loginHint,
        hosted_domain: hostedDomain,
        fetch_basic_profile: fetchBasicProfile,
        discoveryDocs,
        ux_mode: uxMode,
        redirect_uri: redirectUri,
        scope,
        access_type: accessType,
      };

      if (responseType === 'code') {
        params.access_type = 'offline';
      }

      window.gapi.load('auth2', () => {
        setLoaded(true);
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params).then(
            res => {
              if (isSignedIn && res.isSignedIn.get()) {
                handleSigninSuccess(res.currentUser.get());
              }
            },
            err => onFailure(err)
          );
        }
        if (autoLoad) {
          signIn();
        }
      });
    });
  }, []);

  return { signIn, loaded };
};
