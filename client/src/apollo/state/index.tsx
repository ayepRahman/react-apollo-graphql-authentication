import { InMemoryCache } from 'apollo-cache-inmemory';

export default (memoryCache: InMemoryCache) => ({
  cache: memoryCache,
  defaults: {
    isConnected: true,
    user: {
      token: null,
      __typename: 'user',
    },
  },
  resolvers: {
    Mutation: {
      updateNetworkStatus: (
        _: any,
        { isConnected }: { isConnected: boolean },
        { cache }: { cache: InMemoryCache }
      ) => {
        cache.writeData({ data: { isConnected } });
        return null;
      },
    },
    Query: {
      getCurrentUser: (_: any, { user }: { user: { token: string } }) => {
        return user;
      },
    },
  },
});
