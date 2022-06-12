import { gql } from "graphql-request";

export const ADD_STAFF_MUTATION = gql`
  mutation addStaffMutation($fullName: String!) {
    addStaff(fullName: $fullName) {
      message {
        message
      }
      staff {
        id
        fullName
      }
    }
  }
`;
