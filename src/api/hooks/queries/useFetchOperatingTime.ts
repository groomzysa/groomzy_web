import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";

import { OPERATING_TIME_QUERY } from "api/graphql/queries";
import { graphqlRequestClient } from "utils/graphqlClient";
import { DayTime } from "api/generated/graphqlTypes";

import { IUseFetchOperatingTime } from "./types";

export const useFetchOperatingTime = ({
  variables,
}: IUseFetchOperatingTime) => {
  const fetchOperatingTime = async () => {
    return graphqlRequestClient().request(OPERATING_TIME_QUERY, variables);
  };

  const { data, isLoading, error } = useQuery<GraphQLResponse, Error, DayTime>(
    "operatingTime",
    fetchOperatingTime,
    { enabled: !!variables?.id, select: (data) => data?.operatingTime }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    operatingTime: data,
    isLoading,
    fetchServiceErrorMessage: errorMessage,
  };
};
