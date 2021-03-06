const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3030;
const http = require("http");

const { typeDefs, resolvers } = require('./schemas');
//req middleware and apollo server
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

//Open apollo server with auth context.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});
//apply apollo server
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

});

});
