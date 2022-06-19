import { graphqlRequestClient } from "utils/graphqlClient";
import { useProviderProfileQuery } from "api/generated/schema";

import { IUseFetchProviderPrifle } from "./types";

export const useFetchProviderProfile = ({
  variables,
}: IUseFetchProviderPrifle) => {
  const { data, isLoading, error } = useProviderProfileQuery(
    graphqlRequestClient(),
    variables,
    {
      enabled: !!variables?.providerId,
      select: (data) => data?.providerProfile,
    }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { providerProfile: data, isLoading, errorMessage };
};
