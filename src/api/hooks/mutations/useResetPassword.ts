import { graphqlRequestClient } from "utils/graphqlClient";
import { useResetPasswordMutation } from "api/generated/schema";

export const useResetPassword = () => {
  const {
    mutate: resetPasswordMutate,
    data,
    isLoading,
    error,
    isError,
  } = useResetPasswordMutation(graphqlRequestClient());

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    resetPasswordMutate,
    message: data?.resetPassword.message,
    resetPasswordLoading: isLoading,
    resetPasswordErrorMessage: errorMessage,
    resetPasswordHasError: isError,
  };
};
