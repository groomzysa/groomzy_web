import { useMutation } from "react-query";

import { SEND_MAIL_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { IMessage } from "store/types";

import { ISendEmail } from "./types";

export const useSendMail = ({ variables }: ISendEmail) => {
  const sendMail = async () => {
    return graphqlRequestClient().request(SEND_MAIL_MUTATION, variables);
  };

  const {
    mutate: sendMailMutation,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    sendMail: IMessage;
  }>("sendMail", sendMail);

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
