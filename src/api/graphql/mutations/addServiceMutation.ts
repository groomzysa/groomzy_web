import { gql } from "graphql-request";

export const ADD_SERVICE_MUTATION = gql`
  mutation addServiceMutation(
    $category: String!
    $title: String!
    $description: String!
    $duration: Float!
    $durationUnit: String!
    $price: Float!
    $inHouse: Boolean!
  ) {
    addService(
      category: $category
      title: $title
      description: $description
      duration: $duration
      durationUnit: $durationUnit
      price: $price
      inHouse: $inHouse
    ) {
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
