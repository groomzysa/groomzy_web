import { gql } from "graphql-request";

export const ADD_PROVIDER_PROFILE_MUTATION = gql`
  mutation addProviderProfileMutation(
    $tradingName: String!
    $tradingStreetNumber: String!
    $tradingStreetName: String!
    $tradingSuburbName: String!
    $tradingCityName: String!
    $tradingProvinceName: String!
    $tradingAreaCode: String!
    $tradingLatitude: Float
    $tradingLongitude: Float
    $tradingProfileImage: File
  ) {
    addProviderProfile(
      tradingName: $tradingName
      tradingStreetNumber: $tradingStreetNumber
      tradingStreetName: $tradingStreetName
      tradingSuburbName: $tradingSuburbName
      tradingCityName: $tradingCityName
      tradingProvinceName: $tradingProvinceName
      tradingAreaCode: $tradingAreaCode
      tradingLatitude: $tradingLatitude
      tradingLongitude: $tradingLongitude
      tradingProfileImage: $tradingProfileImage
    ) {
      message {
        message
      }
      profile {
        id
        tradingStreetNumber
        tradingStreetName
        tradingSuburbName
        tradingCityName
        tradingProvinceName
        tradingAreaCode
        tradingLatitude
        tradingLongitude
      }
    }
  }
`;
