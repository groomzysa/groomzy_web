import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";

import { CLIENT_QUERY } from "api/graphql/queries";
import { getUserIdAndRole } from "utils/auth";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Client } from "api/generated/graphqlTypes";
import { Role } from "store/types";

export const useFetchClient = (token: string, signedInUser: Client) => {
  let enabled: boolean = false;

  if (token) {
    if (!signedInUser && getUserIdAndRole().role === Role.Client) {
      enabled = true;
    } else {
      enabled = false;
    }
  } else {
    enabled = false;
  }

  const fetchClient = async () => {
    return graphqlRequestClient().request(CLIENT_QUERY, undefined);
  };

  const { data, isLoading, error } = useQuery<GraphQLResponse, Error, Client>(
    "client",
    fetchClient,
    { enabled: enabled, select: (data) => data?.client }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { client: data, isLoading, errorMessage };
};
