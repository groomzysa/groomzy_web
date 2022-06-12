import { gql } from "graphql-request";

export const EDIT_STAFF_MUTATION = gql`
  mutation editStaffMutation($staffId: Int!, $fullName: String) {
    editStaff(staffId: $staffId, fullName: $fullName) {
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
