import { gql } from "graphql-request";

export const EDIT_SOCIAL_MUTATION = gql`
  mutation editSocialMutation($socialId: Int!, $name: String, $url: String) {
    editSocial(socialId: $socialId, name: $name, url: $url) {
      message {
        message
      }
      social {
        id
        name
        url
      }
    }
  }
`;
