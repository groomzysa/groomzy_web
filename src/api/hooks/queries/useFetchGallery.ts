import { graphqlRequestClient } from "utils/graphqlClient";
import { useGalleryQuery } from "api/generated/schema";

import { IUseFetchGallery } from "./types";

export const useFetchGallery = ({ variables }: IUseFetchGallery) => {
  const { data, isLoading, error } = useGalleryQuery(
    graphqlRequestClient(),
    variables,
    {
      enabled: !!variables?.id,
      select: (data) => data?.gallery,
    }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    gallery: data,
    isLoading,
    fetchGalleryErrorMessage: errorMessage,
  };
};
