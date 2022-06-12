import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";

import { PROVIDER_SERVICES_QUERY } from "api/graphql/queries";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Service } from "api/generated/graphqlTypes";

import { IUseFetchProviderServices } from "./types";

export const useFetchProviderServices = ({
  variables,
}: IUseFetchProviderServices) => {
  const fetchProviderServices = async () => {
    return graphqlRequestClient().request(PROVIDER_SERVICES_QUERY, variables);
  };

  const { data, isLoading, error } = useQuery<
    GraphQLResponse,
    Error,
    Service[]
  >("providerServices", fetchProviderServices, {
    enabled: !!variables?.providerId,
    select: (data) => data?.providerServices,
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { providerServices: data, isLoading, errorMessage };
};
