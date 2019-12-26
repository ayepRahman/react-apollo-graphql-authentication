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
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SALT = parseInt(process.env.SALT);
const SECRET = process.env.SECRET;

console.log('SALT', typeof SALT);
console.log('SECRET', typeof SECRET);

export default <IResolverMap>{
  login: async (parent, args, { models }) => {
    const { UsersModel } = models;
    const { username, password } = args;

    try {
      const user = await UsersModel.findOne({ username });

      if (!user) {
        throw new UserInputError(errorMessages.userNameNotFound);
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        throw new UserInputError(errorMessages.wrongPassword);
      }

      return {
        token: jwt.sign(user, SECRET),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  register: async (parent, args, { models }) => {
    const { UsersModel } = models;
    const { username, email, password } = args;

    try {
      const newUser = await UsersModel.create({
        username,
        email,
        password: bcrypt.hashSync(password, SALT),
      });

      return {
        token: jwt.sign({ username: newUser.username, uid: newUser._id }, SECRET),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  userNameAutoComplete: async (parent, args, { models }) => {
    const { UsersModel } = models;
    const { username } = args;

    const isUserNameFound = await UsersModel.findOne({ username });

    if (isUserNameFound) {
      return {
        ok: false,
      };
    }

    return {
      ok: true,
    };
  },
};
