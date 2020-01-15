/*
 * GQL
 * A JavaScript template literal tag that parses GraphQL query strings into the standard GraphQL AST.
 *
 */

import gql from 'graphql-tag';

export const FACEBOOK_AUTH = gql`
  mutation FacebookAuth($accessToken: String!) {
    facebookAuth(accessToken: $accessToken) {
      token
    }
  }
`;
