import { gql } from "graphql-request";

export const ADD_SOCIAL_MUTATION = gql`
  mutation addSocialMutation($name: String!, $url: String!) {
    addSocial(name: $name, url: $url) {
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
