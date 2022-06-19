import { graphqlRequestClient } from "utils/graphqlClient";
import { useProviderSocialsQuery } from "api/generated/schema";

import { IUseFetchProviderSocials } from "./types";

export const useFetchProviderSocials = ({
  variables,
}: IUseFetchProviderSocials) => {
  const { data, isLoading, error } = useProviderSocialsQuery(
    graphqlRequestClient(),
    variables,
    {
      enabled: !!variables?.providerId,
      select: (data) => data?.providerSocials,
    }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { providerSocials: data, isLoading, errorMessage };
};
