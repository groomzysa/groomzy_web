import { graphqlRequestClient } from "utils/graphqlClient";
import { useProviderServicesQuery } from "api/generated/schema";

import { IUseFetchProviderServices } from "./types";

export const useFetchProviderServices = ({
  variables,
}: IUseFetchProviderServices) => {
  const { data, isLoading, error } = useProviderServicesQuery(
    graphqlRequestClient(),
    variables,
    {
      enabled: !!variables?.providerId,
      select: (data) => data?.providerServices,
    }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { providerServices: data, isLoading, errorMessage };
};
