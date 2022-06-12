import { gql } from "graphql-request";

export const STAFF_QUERY = gql`
  query staffQuery($id: Int!) {
    staff(id: $id) {
      id
      fullName
    }
  }
`;
