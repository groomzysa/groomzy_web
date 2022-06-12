import { gql } from "graphql-request";

export const PROVIDER_SERVICES_QUERY = gql`
  query providerServicesQuery($providerId: Int!) {
    providerServices(providerId: $providerId) {
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
