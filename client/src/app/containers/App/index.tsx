import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from 'styles/global';
import { ROUTES } from 'enumerations';
import PrivateRoute from 'app/containers/PrivateRoute';
import FullPageLoader from 'app/components/Loaders/FullPageLoader';

const Home = React.lazy(() => import('app/containers/Home'));
const Dashboard = React.lazy(() => import('app/containers/Dashboard'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Switch>
        <Route exact path={ROUTES.home}>
          <Home />
        </Route>
        <PrivateRoute exact path={ROUTES.dashboard}>
          <Dashboard />
        </PrivateRoute>
      </Switch>
      <GlobalStyle />
    </Suspense>
  );
};

export default App;
