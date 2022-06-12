import { gql } from "graphql-request";

export const DELETE_SERVICE_MUTATION = gql`
  mutation deleteServiceMutation($serviceId: Int!, $categoryId: Int!) {
    deleteService(serviceId: $serviceId, categoryId: $categoryId) {
      message {
        message
      }
      service {
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
  }
`;
