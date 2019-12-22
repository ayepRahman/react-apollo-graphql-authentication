/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import Cookies from 'js-cookie';
import { Route, useHistory } from 'react-router-dom';
import { paths } from 'enumerations';

interface IPrivateRoute {
  path: string;
  exact?: boolean;
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ children, ...props }) => {
  let history = useHistory();

  if (!Cookies.get('token')) {
    history.push(paths.login);
  }

  return <Route {...props}>{children}</Route>;
};

export default PrivateRoute;
