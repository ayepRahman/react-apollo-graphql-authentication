import { IResolverMap } from 'interfaces/IResolvers';
import errorMessages from 'enumerations/errorMessages';

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
