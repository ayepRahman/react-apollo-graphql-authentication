import express from "express";
import dotenv from "dotenv";
import { ApolloServer, gql } from "apollo-server-express";
import mongooseConnect from "./config/mongoose";
import corsOptions from "./config/corsOptions";
import rootSchema from "./features/rootSchema";
import rootModels from "./features/rootModels";
// import bodyParser from "body-parser";
// import jwt from "jsonwebtoken";
// import path from "path";
// import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
// import { SubscriptionServer } from 'subscriptions-transport-ws';
// import { createServer } from 'http';
// import { execute, subscribe } from 'graphql';
// import { schema } from './src/features/rootSchema';
// import { models } from './src/features/rootModels';
// import { refreshTokens } from './src/auth';

// @dev enable using of env variable
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 4000;
// @dev Handling of secret
// const SECRET = process.env.SECRET;
// const SECRET_2 = process.env.SECRET_2;
const app: express.Application = express();

const server = new ApolloServer({
  schema: rootSchema,
  context: ({ req }) => {
    return {
      models: rootModels
    };
  },
  formatError: err => {
    // Don't give the specific errors to the client.
    if (err.message.startsWith("Database Error: ")) {
      return new Error("Internal server error");
    }
    // Otherwise return the original error.  The error can also
    // be manipulated in other ways, so long as it's returned.
    return err;
  }
});

// MongoDB connection status
mongooseConnect();
server.applyMiddleware({ app, cors: corsOptions });
app.listen({ port: SERVER_PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${SERVER_PORT}${server.graphqlPath}`
  )
);
