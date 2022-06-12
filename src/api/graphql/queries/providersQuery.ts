import { gql } from "graphql-request";

export const PROVIDERS_QUERY = gql`
  query providersQuery($search: String, $category: String) {
    providers(search: $search, category: $category) {
      id
      email
      fullName
      profileImageUrl
      profile {
        id
        tradingAreaCode
        tradingCityName
        tradingLatitude
        tradingLongitude
        tradingName
        tradingProfileImageUrl
        tradingProvinceName
        tradingStreetName
        tradingStreetNumber
        tradingSuburbName
      }
      gallery {
        id
        fileName
        name
        url
      }
      socials {
        id
        name
        url
      }
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
      dayTimes {
        id
        day {
          id
          day
        }
        time {
          id
          startTime
          endTime
        }
      }
      serviceProviderCategories {
        category {
          id
          category
        }
        service {
          id
          description
          duration
          durationUnit
          inHouse
          price
          title
        }
      }
      staffs {
        id
        fullName
      }
    }
  }
`;
