// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';
// import path from 'path';
// import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
// import { SubscriptionServer } from 'subscriptions-transport-ws';
// import { createServer } from 'http';
// import { execute, subscribe } from 'graphql';
// import { schema } from './src/features/rootSchema';
// import { models } from './src/features/rootModels';
// import { refreshTokens } from './src/auth';
// import dotenv from 'dotenv';

// dotenv.config();

// const SECRET = process.env.SECRET || 's3cr3t';
// const SECRET_2 = process.env.SECRET_2 || 's3cr3t2';

// const getUserFromHeaders = async (req: any, res: any, next: any) => {
//   const token = req.headers['x-token'];

//   if (token) {
//     try {
//       // verify token with secret
//       const { user } = jwt.verify(token, SECRET);
//       req.user = JSON.stringify(user);
//       console.log(`HAS VERIFIED USER: ${req.user}`);
//     } catch (error) {
//       console.log('TOKEN IS NOT VERIFIED:', error);
//       const refreshToken = req.headers['x-refresh-token'];
//       const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET_2);

//       console.log('newTokens', newTokens);

//       if (newTokens.token && newTokens.refreshToken) {
//         res.set('Access-Control-Expose-Headers', 'x-token', 'x-refresh-token');
//         res.set('x-token', newTokens.token);
//         res.set('x-refresh-token', newTokens.refreshToken);
//       }

//       console.log(`newTokens User: ${newTokens.user}`);

//       req.user = newTokens.user;
//     }
//   }

//   next();
// };
