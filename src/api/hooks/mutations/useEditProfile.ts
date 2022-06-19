import { useQueryClient } from "react-query";

import { getUserIdAndRole } from "utils/auth";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Role } from "store/types";

import { useEditProfileMutation } from "api/generated/schema";

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  const {
    mutate: editProfileMutate,
    data,
    isLoading,
    error,
    isError,
  } = useEditProfileMutation(graphqlRequestClient(), {
    onSuccess: () => {
      const user = getUserIdAndRole();
      const isProvider = user.role === Role.Provider;
      queryClient.invalidateQueries(
        isProvider ? "providerQuery" : "clientQuery"
      );
    },
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    editProfileMutate,
    message: data?.editProfile?.message?.message,
    editProfileLoading: isLoading,
    editProfileErrorMessage: errorMessage,
    editProfileHasError: isError,
  };
};
