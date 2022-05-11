import { gql } from "graphql-request";

export const SIGNIN_PROVIDER_MUTATION = gql`
  mutation signinProviderMutation($email: String!, $password: String!) {
    signinProvider(email: $email, password: $password) {
      id
      email
      fullName
      phoneNumber
      token
      role
    }
  }
`;
