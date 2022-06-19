import { graphqlRequestClient } from "utils/graphqlClient";
import { useStaffQuery } from "api/generated/schema";

import { IUseFetchStaff } from "./types";

export const useFetchStaff = ({ variables }: IUseFetchStaff) => {
  const { data, isLoading, error } = useStaffQuery(
    graphqlRequestClient(),
    variables,
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
