/*
 * GQL
 * A JavaScript template literal tag that parses GraphQL query strings into the standard GraphQL AST.
 *
 */

import gql from 'graphql-tag';

export const GOOGLE_AUTH = gql`
  mutation GoogleAuth($accessToken: String!) {
    googleAuth(accessToken: $accessToken) {
      token
    }
  }
`;
