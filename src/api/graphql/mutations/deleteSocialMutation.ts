import { gql } from "graphql-request";

export const DELETE_SOCIAL_MUTATION = gql`
  mutation deleteSocialMutation($socialId: Int!) {
    deleteSocial(socialId: $socialId) {
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
