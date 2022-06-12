import { gql } from "graphql-request";

export const EDIT_OPERATING_TIME_MUTATION = gql`
  mutation editOperatingTimeMutation(
    $dayTimeId: Int!
    $day: String!
    $startTime: String
    $endTime: String
  ) {
    editOperatingTime(
      dayTimeId: $dayTimeId
      day: $day
      startTime: $startTime
      endTime: $endTime
    ) {
      message {
        message
      }
      operatingTime {
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
  }
`;
