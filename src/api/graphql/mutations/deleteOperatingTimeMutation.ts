import { gql } from "graphql-request";

export const DELETE_OPERATING_TIME_MUTATION = gql`
  mutation deleteOperatingTimeMutation($dayTimeId: Int!) {
    deleteOperatingTime(dayTimeId: $dayTimeId) {
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
