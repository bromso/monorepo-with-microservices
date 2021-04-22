import '@babel/polyfill';
import { execute, subscribe } from 'graphql';
import { ApolloServer, gql } from 'apollo-server';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import mocks from './mocks';

const typeDefs = gql`
  scalar Date

  # Relay specification
  interface Node {
    id: ID!
  }

  interface Edge {
    cursor: String!
    node: Node
  }

  interface Connection {
    totalCount: Int
    edges: [Edge]
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  # Our implementation
  type GameConnection implements Connection {
    totalCount: Int
    edges: [GameEdge]
    pageInfo: PageInfo!
  }

  type GameEdge implements Edge {
    cursor: String!
    node: Game
  }

  type Game implements Node {
    id: ID!
    name: String
  }

  type Casino implements Node {
    id: ID!
    name: String
    address: String
    zipcode: String
    city: String
    country: String
    games(
      allEdges: Boolean
      before: String
      after: String
      first: Int
      last: Int
    ): GameConnection
  }

  type Query {
    node(id: ID!): Node
  }
`;

const delay = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

const server = new ApolloServer({
  context: async (context) => {
    await delay(3000);
    return context;
  },
  subscriptions: '/subscriptions',
  typeDefs,
  // resolvers,
  mocks: process.env.NODE_ENV === 'development' && mocks,
});

(async () => {
  const httpServer = await server.listen();
  console.log(`🚀 Server ready at ${httpServer.url}`);
})();
