import { gql } from "graphql-request";

export const EDIT_PROFILE_MUTATION = gql`
  mutation editProfileMutation(
    fullName: String
    streetNumber: String
    streetName: String
    suburbName: String
    cityName: String
    provinceName: String
    areaCode: String
    latitude: Float
    longitude: Float
  ) {
    signupClient(
      fullName: $fullName
      streetNumber: $streetNumber
      streetName: $streetName
      suburbName: $suburbName
      cityName: $cityName
      provinceName: $provinceName
      areaCode: $areaCode
      latitude: $latitude
      longitude: $longitude
    ) {
      message
    }
  }
`;
