import { graphqlRequestClient } from "utils/graphqlClient";
import { useSigninProviderMutation } from "api/generated/schema";

export const useSigninProvider = () => {
  const {
    mutate: signinProviderMutate,
    data,
    isLoading,
    error,
    isError,
  } = useSigninProviderMutation(graphqlRequestClient());

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
