import { gql } from "graphql-request";

export const SIGNUP_PROVIDER_MUTATION = gql`
  mutation signupProviderMutation(
    $fullName: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
  ) {
    signupProvider(
      fullName: $fullName
      email: $email
      password: $password
      phoneNumber: $phoneNumber
    ) {
      message
    }
  }
`;
