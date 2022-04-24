import { gql } from "graphql-request";

export const PROVIDERS_QUERY = gql`
  query providersQuery($search: String, $category: String) {
    providers(search: $search, category: $category) {
      id
      email
      fullName
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
