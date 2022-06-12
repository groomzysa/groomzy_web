import { useMutation } from "react-query";

import { SIGNIN_CLIENT_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Client } from "api/generated/graphqlTypes";

import { IUseSigninClient } from "./types";

export const useSigninClient = ({ variables }: IUseSigninClient) => {
  const signiClient = async () => {
    return graphqlRequestClient().request(SIGNIN_CLIENT_MUTATION, variables);
  };

  const {
    mutate: signinClientMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    signinClient: Client;
  }>("signiClient", signiClient);

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    signinClientMutate,
    client: data?.signinClient,
    signinClientLoading: isLoading,
    signinClientErrorMessage: errorMessage,
    signinClienthasError: isError,
  };
};
