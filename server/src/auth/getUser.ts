import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthenticationError, UserInputError } from 'apollo-server';
import errorMessages from 'enumerations/errorMessages';

dotenv.config();

const getUser = async (token: any): Promise<string | object> => {
  const SECRET = process.env.SECRET;
  const user = await jwt.verify(token, SECRET);
  console.log('>>>>>>> USER', user);
  return user;
};

export default getUser;
