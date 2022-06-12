import { gql } from "graphql-request";

export const PROVIDER_GALLERY_QUERY = gql`
  query providerGallerysQuery($providerId: Int!) {
    providerGallery(providerId: $providerId) {
      id
      fileName
      name
      url
    }
  }
`;
