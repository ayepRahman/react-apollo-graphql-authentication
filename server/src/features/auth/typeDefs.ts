//TODO: improve type schema

const typeDefs = `
    type User {
      id: ID!
      username: String!
      email: String!
    }

    type Mutation {
      login(username: String!, password: String!): User!
      register(username: String!, email: String!, password: String!): User!
    }

    schema {
      mutation: Mutation
    }
`;

export default typeDefs;
