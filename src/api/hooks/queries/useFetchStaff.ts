import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";

import { STAFF_QUERY } from "api/graphql/queries";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Staff } from "api/generated/graphqlTypes";

import { IUseFetchStaff } from "./types";

export const useFetchStaff = ({ variables }: IUseFetchStaff) => {
  const fetchStaff = async () => {
    return graphqlRequestClient().request(STAFF_QUERY, variables);
  };

  const { data, isLoading, error } = useQuery<GraphQLResponse, Error, Staff>(
    "staff",
    fetchStaff,
    { enabled: !!variables?.id, select: (data) => data?.staff }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    staff: data,
    isLoading,
    fetchStaffErrorMessage: errorMessage,
  };
};
