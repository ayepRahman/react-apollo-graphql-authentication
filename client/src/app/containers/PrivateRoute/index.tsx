/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { ROUTES, LOCAL_STORAGE_TEMPLATE } from 'enumerations';

interface IPrivateRoute {
  path: string;
  exact?: boolean;
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ children, ...props }) => {
  const history = useHistory();

  if (!localStorage.getItem(LOCAL_STORAGE_TEMPLATE.token)) {
    history.push(ROUTES.home);
  }

  return <Route {...props}>{children}</Route>;
};

export default PrivateRoute;
