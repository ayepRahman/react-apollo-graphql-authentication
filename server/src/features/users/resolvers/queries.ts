import { IResolverMap } from 'interfaces/IResolvers';
import errorMessages from 'enumerations/errorMessages';
import { AuthenticationError } from 'apollo-server';

export default <IResolverMap>{
  userOne: async (parent, args, { models, user }) => {
    const { UsersModel } = models;

    try {
      if (user) {
        const currentUser = await UsersModel.findById(user.uid);

        if (currentUser) {
          return {
            uid: currentUser && currentUser._id,
            username: currentUser && currentUser.username,
            email: currentUser && currentUser.email,
            imgUrl: currentUser && currentUser.imgUrl,
          };
        }

        if (!currentUser) {
          throw new Error(errorMessages.userNotFound);
        }
      }

      if (!user) {
        throw new AuthenticationError(errorMessages.authenticationFailure);
      }
    } catch (error) {
      throw new Error(errorMessages.default);
    }
  },
};
