import { gql } from "graphql-request";

export const PROVIDER_PROFILE_QUERY = gql`
  query providerProfileQuery($providerId: Int!) {
    providerProfile(providerId: $providerId) {
      id
      tradingName
      tradingStreetNumber
      tradingStreetName
      tradingSuburbName
      tradingCityName
      tradingProvinceName
      tradingAreaCode
      tradingLatitude
      tradingLongitude
      tradingProfileImageUrl
    }
  }
`;
