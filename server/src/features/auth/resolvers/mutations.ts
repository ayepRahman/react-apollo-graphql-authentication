import { IResolverMap } from 'interfaces/IResolvers';

export default <IResolverMap>{
  login: async (parent, args, { models }) => {
    const { task, checked } = args;

    try {
      await models
        .Todos({
          task,
          checked,
        })
        .save();

      const response = await models.Todos.find();

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  register: async (parent, args, { models }) => {
    const { task, checked } = args;

    try {
      await models
        .Todos({
          task,
          checked,
        })
        .save();

      const response = await models.Todos.find();

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
