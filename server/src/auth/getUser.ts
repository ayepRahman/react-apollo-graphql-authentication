import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthenticationError } from 'apollo-server';
import errorMessages from 'enumerations/errorMessages';

dotenv.config();

const getUser = async (token: any): Promise<string | object> => {
  const SECRET = process.env.SECRET;
  // console.log('getUser', SECRET);
  try {
    const user = await jwt.verify(token, SECRET);

    console.log('>>>>>>>>>>>>>>>>>>', user);

    if (!user) {
      throw new AuthenticationError(errorMessages.auth);
    }

    return user;
  } catch (error) {
    throw new AuthenticationError(errorMessages.default);
  }
};

export default getUser;
