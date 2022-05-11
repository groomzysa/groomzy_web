import { gql } from "graphql-request";

export const SEND_MAIL_MUTATION = gql`
  mutation sendMailMutation(
    $fullName: String!
    $subject: String!
    $email: String!
    $message: String!
  ) {
    sendMail(
      fullName: $fullName
      subject: $subject
      email: $email
      message: $message
    ) {
      message
    }
  }
`;
