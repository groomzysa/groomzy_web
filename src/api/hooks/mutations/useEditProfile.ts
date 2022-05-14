import request from "graphql-request";
import { useMutation } from "react-query";

import { EDIT_PROFILE_MUTATION } from "api/graphql/mutations";
import { getToken } from "utils/auth";
import { IMessage } from "store/types";
import { IUseEditProfile } from "./types";

export const useEditProfile = ({ variables }: IUseEditProfile) => {
  if (!process.env.REACT_APP_API_URL) {
    throw new Error("No API endpoint defined");
  }

  const endpoint: string = process.env.REACT_APP_API_URL;

  const editProfile = async () => {
    return await request(endpoint, EDIT_PROFILE_MUTATION, variables, {
      authorization: `Bearer ${getToken()}`,
    });
  };

  const {
    mutate: editProfileMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    editProfile: IMessage;
  }>("editProfile", editProfile);

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    editProfileMutate,
    message: data?.editProfile?.message,
    editProfileLoading: isLoading,
    editProfileErrorMessage: errorMessage,
    editProfileHasError: isError,
  };
};
