import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";

import { PROVIDER_OPERATING_TIMES_QUERY } from "api/graphql/queries";
import { graphqlRequestClient } from "utils/graphqlClient";
import { DayTime } from "api/generated/graphqlTypes";

import { IUseFetchProviderOperatingTimes } from "./types";

export const useFetchProviderOperatingTimes = ({
  variables,
}: IUseFetchProviderOperatingTimes) => {
  const fetchProviderOperatingTimes = async () => {
    return graphqlRequestClient().request(
      PROVIDER_OPERATING_TIMES_QUERY,
      variables
    );
  };

  const { data, isLoading, error } = useQuery<
    GraphQLResponse,
    Error,
    DayTime[]
  >("providerOperatingTimes", fetchProviderOperatingTimes, {
    enabled: !!variables?.providerId,
    select: (data) => data?.providerOperatingTimes,
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    providerOperatingTimes: data,
    isLoading,
    errorMessage,
  };
};
