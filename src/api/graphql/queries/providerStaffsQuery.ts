import { gql } from "graphql-request";

export const PROVIDER_STAFFS_QUERY = gql`
  query providerStaffsQuery($providerId: Int!) {
    providerStaffs(providerId: $providerId) {
      id
      fullName
    }
  }
`;
