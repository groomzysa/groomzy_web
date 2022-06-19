import { graphqlRequestClient } from "utils/graphqlClient";
import { useSignupProviderMutation } from "api/generated/schema";

export const useSignupProvider = () => {
  const {
    mutate: signupProviderMutate,
    data,
    isLoading,
    error,
    isError,
  } = useSignupProviderMutation(graphqlRequestClient());

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    signupProviderMutate,
    message: data?.signupProvider?.message,
    signupProviderLoading: isLoading,
    signupProviderErrorMessage: errorMessage,
    signupProviderHasError: isError,
  };
};
