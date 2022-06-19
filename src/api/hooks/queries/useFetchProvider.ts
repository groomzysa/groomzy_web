import { getUserIdAndRole } from "utils/auth";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Provider, useProviderQuery } from "api/generated/schema";
import { Role } from "store/types";

export const useFetchProvider = (token: string, signedInUser: Provider) => {
  let enabled: boolean = false;

  if (token) {
    if (!signedInUser && getUserIdAndRole().role === Role.Provider) {
      enabled = true;
    } else {
      enabled = false;
    }
  } else {
    enabled = false;
  }

  const { data, isLoading, error } = useProviderQuery(
    graphqlRequestClient(),
    undefined,
    { enabled: enabled, select: (data) => data?.provider }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { provider: data, isLoading, errorMessage };
};
