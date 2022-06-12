import { gql } from "graphql-request";

export const PROVIDER_SOCIALS_QUERY = gql`
  query providerSocialsQuery($providerId: Int!) {
    providerSocials(providerId: $providerId) {
      id
      name
      url
    }
  }
`;
