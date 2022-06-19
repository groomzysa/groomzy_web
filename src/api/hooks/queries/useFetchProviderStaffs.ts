import { graphqlRequestClient } from "utils/graphqlClient";
import { useProviderStaffsQuery } from "api/generated/schema";

import { IUseFetchProviderStaffs } from "./types";

export const useFetchProviderStaffs = ({
  variables,
}: IUseFetchProviderStaffs) => {
  const { data, isLoading, error } = useProviderStaffsQuery(
    graphqlRequestClient(),
    variables,
    { enabled: !!variables?.providerId, select: (data) => data?.providerStaffs }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { providerStaffs: data, isLoading, errorMessage };
};
