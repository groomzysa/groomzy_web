import request from "graphql-request";
import { useMutation } from "react-query";

import { SIGNUP_CLIENT_MUTATION } from "api/graphql/mutations";
import { IMessage } from "store/types";
import { IUseSignupClient } from "./types";

export const useSignupClient = ({ variables }: IUseSignupClient) => {
  if (!process.env.REACT_APP_API_URL) {
    throw new Error("No API endpoint defined");
  }

  const endpoint: string = process.env.REACT_APP_API_URL;

  const sigupClient = async () => {
    return await request(endpoint, SIGNUP_CLIENT_MUTATION, variables);
  };

  const {
    mutate: signupClientMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    signupClient: IMessage;
  }>("sigupClient", sigupClient);

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
