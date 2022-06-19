import { graphqlRequestClient } from "utils/graphqlClient";
import { useServiceQuery } from "api/generated/schema";

import { IUseFetchService } from "./types";

export const useFetchService = ({ variables }: IUseFetchService) => {
  const { data, isLoading, error } = useServiceQuery(
    graphqlRequestClient(),
    variables,
    { enabled: !!variables?.id, select: (data) => data?.service }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    service: data,
    isLoading,
    fetchServiceErrorMessage: errorMessage,
  };
};
