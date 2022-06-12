import { gql } from "graphql-request";

export const SIGNIN_CLIENT_MUTATION = gql`
  mutation signinClientMutation($email: String!, $password: String!) {
    signinClient(email: $email, password: $password) {
      id
      email
      fullName
      phoneNumber
      profileImageUrl
      token
      role
      address {
        id
        streetNumber
        streetName
        suburbName
        cityName
        provinceName
        areaCode
        latitude
        longitude
      }
    }
  }
`;
