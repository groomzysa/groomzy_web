import { graphqlRequestClient } from "utils/graphqlClient";
import { useSigninClientMutation } from "api/generated/schema";

export const useSigninClient = () => {
  const {
    mutate: signinClientMutate,
    data,
    isLoading,
    error,
    isError,
  } = useSigninClientMutation(graphqlRequestClient());

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
