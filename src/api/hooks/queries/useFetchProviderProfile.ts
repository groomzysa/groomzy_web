import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";

import { PROVIDER_PROFILE_QUERY } from "api/graphql/queries";
import { graphqlRequestClient } from "utils/graphqlClient";
import { ProviderProfile } from "api/generated/graphqlTypes";

import { IUseFetchProviderPrifle } from "./types";

export const useFetchProviderProfile = ({
  variables,
}: IUseFetchProviderPrifle) => {
  const fetchProviderProfile = async () => {
    return graphqlRequestClient().request(PROVIDER_PROFILE_QUERY, variables);
  };

  const { data, isLoading, error } = useQuery<
    GraphQLResponse,
    Error,
    ProviderProfile
  >("providerProfile", fetchProviderProfile, {
    enabled: !!variables?.providerId,
    select: (data) => data?.providerProfile,
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { providerProfile: data, isLoading, errorMessage };
};
