import { useMutation } from "react-query";

import { SIGNUP_CLIENT_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { IMessage } from "store/types";

import { IUseSignupClient } from "./types";

export const useSignupClient = ({ variables }: IUseSignupClient) => {
  const sigupClient = async () => {
    return graphqlRequestClient().request(SIGNUP_CLIENT_MUTATION, variables);
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
