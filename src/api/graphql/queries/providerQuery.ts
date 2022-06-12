import { gql } from "graphql-request";

export const PROVIDER_QUERY = gql`
  query providerQuery {
    provider {
      id
      email
      fullName
      profileImageUrl
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
