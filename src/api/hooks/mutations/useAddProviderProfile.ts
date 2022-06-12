import { useMutation, useQueryClient } from "react-query";

import { ADD_PROVIDER_PROFILE_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Message, ProviderProfile } from "api/generated/graphqlTypes";

import { IUseAddProviderProfile } from "./types";

export const useAddProviderProfile = ({
  variables,
}: IUseAddProviderProfile) => {
  const queryClient = useQueryClient();

  const addProviderProfile = async () => {
    return graphqlRequestClient().request(
      ADD_PROVIDER_PROFILE_MUTATION,
      variables
    );
  };

  const {
    mutate: addProviderProfileMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    addProviderProfile: {
      message: Message;
      addProviderProfile: ProviderProfile;
    };
  }>("addProviderProfile", addProviderProfile, {
    onSuccess: (data) => {
      queryClient.setQueryData("providerProfile", () => {
        return { providerProfile: data.addProviderProfile };
      });
    },
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    addProviderProfileMutate,
    message: data?.addProviderProfile?.message?.message,
    addProviderProfileLoading: isLoading,
    addProviderProfileErrorMessage: errorMessage,
    addProviderProfileHasError: isError,
  };
};
