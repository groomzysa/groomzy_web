import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";

import { PROVIDER_STAFFS_QUERY } from "api/graphql/queries";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Staff } from "api/generated/graphqlTypes";

import { IUseFetchProviderStaffs } from "./types";

export const useFetchProviderStaffs = ({
  variables,
}: IUseFetchProviderStaffs) => {
  const fetchProviderStaffs = async () => {
    return graphqlRequestClient().request(PROVIDER_STAFFS_QUERY, variables);
  };

  const { data, isLoading, error } = useQuery<GraphQLResponse, Error, Staff[]>(
    "providerStaffs",
    fetchProviderStaffs,
    { enabled: !!variables?.providerId, select: (data) => data?.providerStaffs }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { providerStaffs: data, isLoading, errorMessage };
};
