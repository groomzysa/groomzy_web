import { gql } from "graphql-request";

export const DELETE_STAFF_MUTATION = gql`
  mutation deleteStaffMutation($staffId: Int!) {
    deleteStaff(staffId: $staffId) {
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
