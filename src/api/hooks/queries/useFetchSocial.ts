import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";

import { SOCIAL_QUERY } from "api/graphql/queries";
import { graphqlRequestClient } from "utils/graphqlClient";
import { ProviderSocial } from "api/generated/graphqlTypes";

import { IUseFetchSocial } from "./types";

export const useFetchSocial = ({ variables }: IUseFetchSocial) => {
  const fetchSocial = async () => {
    return graphqlRequestClient().request(SOCIAL_QUERY, variables);
  };

  const { data, isLoading, error } = useQuery<
    GraphQLResponse,
    Error,
    ProviderSocial
  >("social", fetchSocial, {
    enabled: !!variables?.id,
    select: (data) => data?.social,
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    social: data,
    isLoading,
    fetchSocialErrorMessage: errorMessage,
  };
};
