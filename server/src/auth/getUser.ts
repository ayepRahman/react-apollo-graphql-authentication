import express from 'express';
import jwt from 'jsonwebtoken';
import {
  ApolloError,
  toApolloError,
  SyntaxError,
  ValidationError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server';

const getUser = (req: express.Request): string | object => {
  const token = req.headers.authorization || '';
  const SECRET = process.env.SECRET;

  if (token) {
    const tokenValue = token.replace('Bearer ', '');
    const user = jwt.verify(tokenValue, SECRET);
    return user;
  }

  return null;
};

export default getUser;
