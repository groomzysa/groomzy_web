import { graphqlRequestClient } from "utils/graphqlClient";
import { useRequestResetPasswordMutation } from "api/generated/schema";

export const useRequestResetPassword = () => {
  const {
    mutate: requestResetPasswordMutate,
    data,
    isLoading,
    error,
    isError,
  } = useRequestResetPasswordMutation(graphqlRequestClient());

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    requestResetPasswordMutate,
    message: data?.requestResetPassword.message,
    requestResetPasswordLoading: isLoading,
    requestResetPasswordErrorMessage: errorMessage,
    requestResetPasswordHasError: isError,
  };
};
