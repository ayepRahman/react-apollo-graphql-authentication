import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from 'styles/global';
import FullPageLoader from 'app/components/Loaders/FullPageLoader';

const Todos = React.lazy(() => import('app/containers/Todos'));

const App: React.FC = () => {
  return (
    <Suspense fallback={FullPageLoader}>
      <Switch>
        <Route exact path="/">
          <Todos />
        </Route>
      </Switch>
      <GlobalStyle />
    </Suspense>
  );
};

export default App;
