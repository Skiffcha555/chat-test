import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    }
  }
});

const httpLinkWithAuth = authLink.concat(httpLink);

const wsClient = createClient({
  url: 'ws://localhost:3000/graphql',
  connectionParams: () => ({
    authToken: localStorage.getItem('token'),
  }),
});

wsClient.on('closed', () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
});

const wsLink = new GraphQLWsLink(wsClient);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLinkWithAuth,
);

const createApolloClient = () => {
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
