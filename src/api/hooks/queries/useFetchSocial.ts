import { graphqlRequestClient } from "utils/graphqlClient";
import { useSocialQuery } from "api/generated/schema";

import { IUseFetchSocial } from "./types";

export const useFetchSocial = ({ variables }: IUseFetchSocial) => {
  const { data, isLoading, error } = useSocialQuery(
    graphqlRequestClient(),
    variables,
    {
      enabled: !!variables?.id,
      select: (data) => data?.social,
    }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    social: data,
    isLoading,
    fetchSocialErrorMessage: errorMessage,
  };
};
