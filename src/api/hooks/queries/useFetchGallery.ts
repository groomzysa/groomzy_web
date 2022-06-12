import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";

import { GALLERY_QUERY } from "api/graphql/queries";
import { graphqlRequestClient } from "utils/graphqlClient";
import { ProviderGallery } from "api/generated/graphqlTypes";

import { IUseFetchGallery } from "./types";

export const useFetchGallery = ({ variables }: IUseFetchGallery) => {
  const fetchGallery = async () => {
    return graphqlRequestClient().request(GALLERY_QUERY, variables);
  };

  const { data, isLoading, error } = useQuery<
    GraphQLResponse,
    Error,
    ProviderGallery
  >("gallery", fetchGallery, {
    enabled: !!variables?.id,
    select: (data) => data?.gallery,
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    gallery: data,
    isLoading,
    fetchGalleryErrorMessage: errorMessage,
  };
};
