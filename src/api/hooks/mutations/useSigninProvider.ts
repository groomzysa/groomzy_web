import request from "graphql-request";
import { useMutation } from "react-query";

import { SIGNIN_PROVIDER_MUTATION } from "api/graphql/mutations";
import { ISignInProvider } from "store/types";
import { IUseSigninClient } from "./types";

export const useSigninProvider = ({ variables }: IUseSigninClient) => {
  if (!process.env.REACT_APP_API_URL) {
    throw new Error("No API endpoint defined");
  }

  const endpoint: string = process.env.REACT_APP_API_URL;

  const signiClient = async () => {
    const client = await request(endpoint, SIGNIN_PROVIDER_MUTATION, variables);

    return client;
  };

  const {
    mutate: signinProviderMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    signinProvider: ISignInProvider;
  }>("signiClient", signiClient);

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    signinProviderMutate,
    provider: data?.signinProvider,
    signinProviderLoading: isLoading,
    signinProviderErrorMessage: errorMessage,
    signinProviderHasError: isError,
  };
};
