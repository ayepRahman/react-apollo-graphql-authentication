/**
 * Apollo Advanced Configuration
 * https://www.apollographql.com/docs/react/migrating/boost-migration/
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import theme from 'styles/theme';
import * as serviceWorker from './serviceWorker';
import App from 'app/containers/App';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const cache = new InMemoryCache({});

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log('[graphQLErrors]', graphQLErrors);
    }
    if (networkError) {
      console.log('[networkError]', networkError);
    }
  }),
  new HttpLink({
    uri: SERVER_URL,
    // For server with deifferent domain use "include"
    credentials: 'same-origin',
  }),
]);

const request = async (operation: any) => {
  const token = await localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token,
    },
  });
};

const client = new ApolloClient({
  link,
  cache,
});

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
