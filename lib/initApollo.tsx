import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import { persistCache } from 'apollo-cache-persist';
import { PersistedData, PersistentStorage } from 'apollo-cache-persist/types';

let apolloClient: ApolloClient<NormalizedCacheObject>;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState?: any) {
  const cache = new InMemoryCache().restore(initialState || {});

  if (process.browser) {
    persistCache({
      cache,
      storage: window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>
    });
  }

  const apiURI: string = process.env.NODE_ENV !== 'production' ? 'http://localhost:3001/api' : 'https://cfop.aduryag.in/api';
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: apiURI, // Server URL (must be absolute)
    }),
    cache
  });
}

export default function initApollo(initialState?: any) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
