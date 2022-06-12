import { gql } from "graphql-request";

export const SOCIAL_QUERY = gql`
  query socialQuery($id: Int!) {
    social(id: $id) {
      id
      name
      url
    }
  }
`;
