import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const cache = new InMemoryCache({});

const request = async (operation: any) => {
  const token = await localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token,
    },
  });
};

export const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log('[graphQLErrors]', graphQLErrors);
    }
    if (networkError) {
      console.log('[networkError]', networkError);
    }
  }),
  requestLink,
  withClientState({
    defaults: {
      isConnected: true,
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (
          _: any,
          { isConnected }: { isConnected: boolean },
          { cache }: { cache: any }
        ) => {
          cache.writeData({ data: { isConnected } });
          return null;
        },
      },
    },
    cache,
  }),
  new HttpLink({
    uri: SERVER_URL,
    // For server with deifferent domain use "include"
    credentials: 'same-origin',
  }),
]);

const client = new ApolloClient({ link, cache });

export { client };
