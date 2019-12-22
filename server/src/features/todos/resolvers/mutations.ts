import { IResolverMap } from "interfaces/IResolvers";

export default <IResolverMap>{
  createTodos: async (parent, args, { models }) => {
    const { task, checked } = args;

    try {
      await models
        .Todos({
          task,
          checked
        })
        .save();

      const response = await models.Todos.find();

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  updateTodosById: async (parent, args, { models }) => {
    const { id, task, checked } = args;

    try {
      const todo = await models.Todos.findById(id);
      await todo.set({ task: task, checked: checked });
      await todo.save();
      const todos = await models.Todos.find();
      return todos;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteTodoById: async (parent, args, { models }) => {
    const { id } = args;

    try {
      await models.Todos.deleteOne({ _id: id });
      const todos = await models.Todos.find();
      return todos;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
