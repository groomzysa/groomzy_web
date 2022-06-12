import { gql } from "graphql-request";

export const SERVICE_QUERY = gql`
  query serviceQuery($id: Int!) {
    service(id: $id) {
      id
      description
      duration
      durationUnit
      inHouse
      price
      title
      serviceProviderCategories {
        category {
          id
          category
        }
      }
    }
  }
`;
