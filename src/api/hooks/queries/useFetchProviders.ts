import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";

import { PROVIDERS_QUERY } from "api/graphql/queries";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Provider } from "api/generated/graphqlTypes";

import { IUseFetchProviders } from "./types";

export const useFetchProviders = ({ variables }: IUseFetchProviders) => {
  const fetchProviders = async () => {
    return graphqlRequestClient().request(PROVIDERS_QUERY, variables);
  };

  const { data, isLoading, error } = useQuery<
    GraphQLResponse,
    Error,
    Provider[]
  >("providers", fetchProviders, { select: (data) => data?.providers });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { providers: data || [], isLoading, errorMessage };
};
