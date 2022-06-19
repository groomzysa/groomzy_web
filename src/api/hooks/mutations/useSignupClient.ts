import { graphqlRequestClient } from "utils/graphqlClient";
import { useSignupClientMutation } from "api/generated/schema";

export const useSignupClient = () => {
  const {
    mutate: signupClientMutate,
    data,
    isLoading,
    error,
    isError,
  } = useSignupClientMutation(graphqlRequestClient());

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    signupClientMutate,
    message: data?.signupClient?.message,
    signupClientLoading: isLoading,
    signupClientErrorMessage: errorMessage,
    signupClientHasError: isError,
  };
};
