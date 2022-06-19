import { graphqlRequestClient } from "utils/graphqlClient";
import { useProviderGalleryQuery } from "api/generated/schema";

import { IUseFetchProviderGallery } from "./types";

export const useFetchProviderGallery = ({
  variables,
}: IUseFetchProviderGallery) => {
  const { data, isLoading, error } = useProviderGalleryQuery(
    graphqlRequestClient(),
    variables,
    {
      enabled: !!variables?.providerId,
      select: (data) => data?.providerGallery,
    }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { providerGallery: data, isLoading, errorMessage };
};
