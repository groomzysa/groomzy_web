import { graphqlRequestClient } from "utils/graphqlClient";
import { useOperatingTimeQuery } from "api/generated/schema";

import { IUseFetchOperatingTime } from "./types";

export const useFetchOperatingTime = ({
  variables,
}: IUseFetchOperatingTime) => {
  const { data, isLoading, error } = useOperatingTimeQuery(
    graphqlRequestClient(),
    variables,
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
