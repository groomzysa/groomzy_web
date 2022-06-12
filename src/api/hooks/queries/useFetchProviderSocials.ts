import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";

import { PROVIDER_SOCIALS_QUERY } from "api/graphql/queries";
import { graphqlRequestClient } from "utils/graphqlClient";
import { ProviderSocial } from "api/generated/graphqlTypes";

import { IUseFetchProviderSocials } from "./types";

export const useFetchProviderSocials = ({
  variables,
}: IUseFetchProviderSocials) => {
  const fetchProviderSocials = async () => {
    return graphqlRequestClient().request(PROVIDER_SOCIALS_QUERY, variables);
  };

  const { data, isLoading, error } = useQuery<
    GraphQLResponse,
    Error,
    ProviderSocial[]
  >("providerSocials", fetchProviderSocials, {
    enabled: !!variables?.providerId,
    select: (data) => data?.providerSocials,
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { providerSocials: data, isLoading, errorMessage };
};
