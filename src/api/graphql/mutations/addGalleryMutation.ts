import { gql } from "graphql-request";

export const ADD_GALLERY_MUTATION = gql`
  mutation addGalleryMutation($name: String!, $galleryImageFile: File!) {
    addGallery(name: $name, galleryImageFile: $galleryImageFile) {
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
