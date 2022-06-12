import { gql } from "graphql-request";

export const PROVIDER_OPERATING_TIMES_QUERY = gql`
  query providerOperatingTimesQuery($providerId: Int!) {
    providerOperatingTimes(providerId: $providerId) {
      id
      day {
        id
        day
      }
      time {
        id
        startTime
        endTime
      }
    }
  }
`;
