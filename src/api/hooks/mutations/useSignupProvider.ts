import { useMutation } from "react-query";

import { SIGNUP_PROVIDER_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { IMessage } from "store/types";

import { IUseSignupProvider } from "./types";

export const useSignupProvider = ({ variables }: IUseSignupProvider) => {
  const signupProvider = async () => {
    return graphqlRequestClient().request(SIGNUP_PROVIDER_MUTATION, variables);
  };

  const {
    mutate: signupProviderMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    signupProvider: IMessage;
  }>("signupProvider", signupProvider);

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
