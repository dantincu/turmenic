const { ApolloServer } = require('apollo-server');
const { GqlSchema } = require('./schema');
const { DataResolvers } = require('./data');

const typeDefs = GqlSchema;
const resolvers = DataResolvers;

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
