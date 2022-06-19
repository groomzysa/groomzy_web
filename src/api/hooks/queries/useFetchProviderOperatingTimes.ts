import { graphqlRequestClient } from "utils/graphqlClient";
import { useProviderOperatingTimesQuery } from "api/generated/schema";

import { IUseFetchProviderOperatingTimes } from "./types";

export const useFetchProviderOperatingTimes = ({
  variables,
}: IUseFetchProviderOperatingTimes) => {
  const { data, isLoading, error } = useProviderOperatingTimesQuery(
    graphqlRequestClient(),
    variables,
    {
      enabled: !!variables?.providerId,
      select: (data) => data?.providerOperatingTimes,
    }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    providerOperatingTimes: data,
    isLoading,
    errorMessage,
  };
};
