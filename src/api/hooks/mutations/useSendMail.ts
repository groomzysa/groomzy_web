import { graphqlRequestClient } from "utils/graphqlClient";
import { useSendMailMutation } from "api/generated/schema";

export const useSendMail = () => {
  const {
    mutate: sendMailMutation,
    data,
    isLoading,
    error,
    isError,
  } = useSendMailMutation(graphqlRequestClient());

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    sendMailMutation,
    message: data?.sendMail?.message,
    sendMailLoading: isLoading,
    sendMailErrorMessage: errorMessage,
    sendMailhasError: isError,
  };
};
