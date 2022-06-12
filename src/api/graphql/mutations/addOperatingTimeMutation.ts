import { gql } from "graphql-request";

export const ADD_OPERATING_TIME_MUTATION = gql`
  mutation addOperatingTimeMutation(
    $day: String!
    $startTime: String!
    $endTime: String!
  ) {
    addOperatingTime(day: $day, startTime: $startTime, endTime: $endTime) {
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
