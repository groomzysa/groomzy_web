import { getUserIdAndRole } from "utils/auth";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Client, useClientQuery } from "api/generated/schema";
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

  const { data, isLoading, error } = useClientQuery(
    graphqlRequestClient(),
    undefined,
    { enabled: enabled, select: (data) => data?.client }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { client: data, isLoading, errorMessage };
};
