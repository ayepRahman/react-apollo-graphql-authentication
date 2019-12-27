import { IResolverMap } from 'interfaces/IResolvers';
import {
  ApolloError,
  toApolloError,
  SyntaxError,
  ValidationError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server';
import errorMessages from 'enumerations/errorMessages';
import dotenv from 'dotenv';
dotenv.config();

export default <IResolverMap>{
  userNameAutoComplete: async (parent, args, { models }) => {
    const { UsersModel } = models;
    const { username } = args;

    const isUserNameFound = await UsersModel.findOne({ username });

    if (isUserNameFound) {
      return {
        ok: false,
        message: errorMessages.userNameIsFound,
      };
    }

    return {
      ok: true,
    };
  },
};
