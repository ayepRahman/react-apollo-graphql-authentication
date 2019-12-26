//TODO: improve type schema

const typeDefs = `
    type Ok {
      ok: Boolean!
    }

    type User {
      id: ID!
      username: String!
      email: String!
    }

    type Token {
      token: String
    }

    type Mutation {
      login(username: String!, password: String!): Token!
      register(username: String!, email: String!, password: String!): Token!
      userNameAutoComplete(username: String!): Ok!
    }

    type Query {
      dummy: String
    }

    schema {
      query: Query
      mutation: Mutation
    }
`;

export default typeDefs;
