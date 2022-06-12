import { gql } from "graphql-request";

export const DELETE_GALLERY_MUTATION = gql`
  mutation deleteGalleryMutation($galleryId: Int!, $fileName: String!) {
    deleteGallery(galleryId: $galleryId, fileName: $fileName) {
      message {
        message
      }
      gallery {
        id
        fileName
        name
        url
      }
    }
  }
`;
