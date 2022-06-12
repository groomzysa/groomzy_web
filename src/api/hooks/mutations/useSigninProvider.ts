import { useMutation } from "react-query";

import { SIGNIN_PROVIDER_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Provider } from "api/generated/graphqlTypes";

import { IUseSigninProvider } from "./types";

export const useSigninProvider = ({ variables }: IUseSigninProvider) => {
  const signiClient = async () => {
    return graphqlRequestClient().request(SIGNIN_PROVIDER_MUTATION, variables);
  };

  const {
    mutate: signinProviderMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    signinProvider: Provider;
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
