import { gql } from "graphql-request";

export const GALLERY_QUERY = gql`
  query galleryQuery($id: Int!) {
    gallery(id: $id) {
      id
      fileName
      name
      url
    }
  }
`;
