import request from "graphql-request";
import { useMutation } from "react-query";

import { SEND_MAIL_MUTATION } from "api/graphql/mutations";
import { IMessage } from "store/types";
import { ISendEmail } from "./types";

export const useSendMail = ({ variables }: ISendEmail) => {
  if (!process.env.REACT_APP_API_URL) {
    throw new Error("No API endpoint defined");
  }

  const endpoint: string = process.env.REACT_APP_API_URL;

  const sendMail = async () => {
    return await request(endpoint, SEND_MAIL_MUTATION, variables);
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
