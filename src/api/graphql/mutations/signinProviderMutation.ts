import { gql } from "graphql-request";

export const SIGNIN_PROVIDER_MUTATION = gql`
  mutation signinProviderMutation($email: String!, $password: String!) {
    signinProvider(email: $email, password: $password) {
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
