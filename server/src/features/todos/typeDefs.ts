const typeDefs = `
    type Todos {
      id: ID!
      task: String!
      checked: Boolean!
    }
  
    type Query {
      getTodos: [Todos!]!
    }

    type Mutation {
      createTodos(task: String!, checked: Boolean!): [Todos!]!
      updateTodosById(id: ID!, task: String!, checked: Boolean!): [Todos!]!
      deleteTodoById(id: ID!): [Todos!]!
    }
 
    schema {
      query: Query
      mutation: Mutation
    }
`;

export default typeDefs;
