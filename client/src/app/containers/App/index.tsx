import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from 'styles/global';
import { paths } from 'enumerations';
import PrivateRoute from 'app/containers/PrivateRoute';
import FullPageLoader from 'app/components/Loaders/FullPageLoader';

const Login = React.lazy(() => import('app/containers/Login'));
const Register = React.lazy(() => import('app/containers/Register'));

const Dashboard: React.FC = () => {
  return <div>DASHBOARD PRIVATE ARE</div>;
};

const App: React.FC = () => {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Switch>
        <Route exact path={paths.login}>
          <Login />
        </Route>
        <Route exact path={paths.register}>
          <Register />
        </Route>
        <PrivateRoute path={paths.dashboard}>
          <Dashboard />
        </PrivateRoute>
      </Switch>
      <GlobalStyle />
    </Suspense>
  );
};

export default App;
