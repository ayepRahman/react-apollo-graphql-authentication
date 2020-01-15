const typeDefs = `
    type UserNameAutoComplete {
      ok: Boolean!
      message: String
    }

    type User {
      id: ID!
      username: String
      email: String
    }

    type Token {
      token: String
    }

    type Mutation {
      login(username: String!, password: String!): Token!
      register(username: String!, email: String!, password: String!): Token!
      googleAuth(accessToken: String!): Token!
      facebookAuth(accessToken: String!): Token!
    }

    type Query {
      userNameAutoComplete(username: String!): UserNameAutoComplete!
    }

    schema {
      query: Query
      mutation: Mutation
    }
`;

export default typeDefs;
