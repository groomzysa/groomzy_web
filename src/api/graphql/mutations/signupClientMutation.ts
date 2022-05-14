import { gql } from "graphql-request";

export const SIGNUP_CLIENT_MUTATION = gql`
  mutation signupClientMutation(
    $fullName: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
  ) {
    signupClient(
      fullName: $fullName
      email: $email
      password: $password
      phoneNumber: $phoneNumber
    ) {
      message
    }
  }
`;
