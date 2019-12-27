/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { paths, localStorageNames } from 'enumerations';

interface IPrivateRoute {
  path: string;
  exact?: boolean;
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ children, ...props }) => {
  const history = useHistory();

  if (!localStorage.getItem(localStorageNames.token)) {
    history.push(paths.home);
  }

  return <Route {...props}>{children}</Route>;
};

export default PrivateRoute;
