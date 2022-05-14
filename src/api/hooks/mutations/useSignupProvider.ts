import request from "graphql-request";
import { useMutation } from "react-query";

import { SIGNUP_PROVIDER_MUTATION } from "api/graphql/mutations";
import { IMessage } from "store/types";
import { IUseSignupProvider } from "./types";

export const useSignupProvider = ({ variables }: IUseSignupProvider) => {
  if (!process.env.REACT_APP_API_URL) {
    throw new Error("No API endpoint defined");
  }

  const endpoint: string = process.env.REACT_APP_API_URL;

  const signupProvider = async () => {
    return await request(endpoint, SIGNUP_PROVIDER_MUTATION, variables);
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
