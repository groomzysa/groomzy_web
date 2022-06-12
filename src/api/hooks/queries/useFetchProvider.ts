import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";

import { PROVIDER_QUERY } from "api/graphql/queries";
import { getUserIdAndRole } from "utils/auth";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Provider } from "api/generated/graphqlTypes";
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

  const fetchProvider = async () => {
    return graphqlRequestClient().request(PROVIDER_QUERY, undefined);
  };

  const { data, isLoading, error } = useQuery<GraphQLResponse, Error, Provider>(
    "provider",
    fetchProvider,
    { enabled: enabled, select: (data) => data?.provider }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { provider: data, isLoading, errorMessage };
};
