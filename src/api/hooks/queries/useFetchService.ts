import { useQuery } from "react-query";
import { GraphQLResponse } from "graphql-request/dist/types";

import { SERVICE_QUERY } from "api/graphql/queries";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Service } from "api/generated/graphqlTypes";

import { IUseFetchService } from "./types";

export const useFetchService = ({ variables }: IUseFetchService) => {
  const fetchService = async () => {
    return graphqlRequestClient().request(SERVICE_QUERY, variables);
  };

  const { data, isLoading, error } = useQuery<GraphQLResponse, Error, Service>(
    "service",
    fetchService,
    { enabled: !!variables?.id, select: (data) => data?.service }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    service: data,
    isLoading,
    fetchServiceErrorMessage: errorMessage,
  };
};
