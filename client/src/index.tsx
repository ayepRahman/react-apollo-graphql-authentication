/**
 * Apollo Advanced Configuration
 * https://www.apollographql.com/docs/react/migrating/boost-migration/
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { client } from 'apollo';
import theme from 'styles/theme';
import * as serviceWorker from './serviceWorker';
import App from 'app/containers/App';

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
