import request from "graphql-request";
import { useMutation } from "react-query";

import { SIGNIN_CLIENT_MUTATION } from "api/graphql/mutations";
import { ISignInClient } from "store/types";
import { IUseSigninClient } from "./types";

export const useSigninClient = ({ variables }: IUseSigninClient) => {
  if (!process.env.REACT_APP_API_URL) {
    throw new Error("No API endpoint defined");
  }

  const endpoint: string = process.env.REACT_APP_API_URL;

  const signiClient = async () => {
    return await request(endpoint, SIGNIN_CLIENT_MUTATION, variables);
  };

  const {
    mutate: signinClientMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    signinClient: ISignInClient;
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
