import { graphqlRequestClient } from "utils/graphqlClient";
import { useProvidersQuery } from "api/generated/schema";

import { IUseFetchProviders } from "./types";

export const useFetchProviders = ({ variables }: IUseFetchProviders) => {
  const { data, isLoading, error } = useProvidersQuery(
    graphqlRequestClient(),
    variables,
    { select: (data) => data?.providers }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { providers: data || [], isLoading, errorMessage };
};
