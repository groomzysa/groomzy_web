import { useMutation, useQueryClient } from "react-query";

import { EDIT_PROFILE_MUTATION } from "api/graphql/mutations";
import { getUserIdAndRole } from "utils/auth";
import { graphqlRequestClient } from "utils/graphqlClient";
import { IMessage, Role } from "store/types";

import { IUseEditProfile } from "./types";

export const useEditProfile = ({ variables }: IUseEditProfile) => {
  const queryClient = useQueryClient();

  const editProfile = async () => {
    return graphqlRequestClient().request(EDIT_PROFILE_MUTATION, variables);
  };

  const {
    mutate: editProfileMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    editProfile: IMessage;
  }>("editProfile", editProfile, {
    onSuccess: (data) => {
      const user = getUserIdAndRole();
      const isProvider = user.role === Role.Provider;
      //@ts-ignore
      queryClient.setQueryData(
        [isProvider ? "provider" : "client", { id: user.id }],
        data
      );
    },
  });

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
