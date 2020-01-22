import React from 'react';

declare global {
  interface Window {
    FB: any;
    gapi: any;
  }
}

const useGoogleAuth = () => {
  React.useEffect(() => {
    window.gapi;
  }, []);

  return <div></div>;
};

useGoogleAuth.propTypes = {};

export default useGoogleAuth;
