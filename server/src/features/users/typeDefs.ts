const typeDefs = `
    type User {
      uid: ID!
      username: String
      email: String
      imgUrl: String
    }

    type Query {
      userOne: User!
    }

    schema {
      query: Query
    }
`;

export default typeDefs;
