import {gql} from '@apollo/client';

export const SIGN_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const SIGN_UP = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $firstname: String
    $lastname: String
  ) {
    createAccount(username: $username, email: $email, firstname: $firstname, lastname: $lastname)
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $email: String!) {
    confirmSecret(secret: $secret, email: $email)
  }
`;
