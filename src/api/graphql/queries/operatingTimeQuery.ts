import { gql } from "graphql-request";

export const OPERATING_TIME_QUERY = gql`
  query operatingTimeQuery($id: Int!) {
    operatingTime(id: $id) {
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
