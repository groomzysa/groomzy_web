import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";

import { PROVIDER_GALLERY_QUERY } from "api/graphql/queries";
import { graphqlRequestClient } from "utils/graphqlClient";
import { ProviderGallery } from "api/generated/graphqlTypes";

import { IUseFetchProviderGallery } from "./types";

export const useFetchProviderGallery = ({
  variables,
}: IUseFetchProviderGallery) => {
  const fetchProviderGallery = async () => {
    return graphqlRequestClient().request(PROVIDER_GALLERY_QUERY, variables);
  };

  const { data, isLoading, error } = useQuery<
    GraphQLResponse,
    Error,
    ProviderGallery[]
  >("providerGallery", fetchProviderGallery, {
    enabled: !!variables?.providerId,
    select: (data) => data?.providerGallery,
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { providerGallery: data, isLoading, errorMessage };
};
