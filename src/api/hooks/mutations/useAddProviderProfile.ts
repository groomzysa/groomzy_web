import { useQueryClient } from "react-query";

import { graphqlRequestClient } from "utils/graphqlClient";
import { useAddProviderProfileMutation } from "api/generated/schema";

export const useAddProviderProfile = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addProviderProfileMutate,
    data,
    isLoading,
    error,
    isError,
  } = useAddProviderProfileMutation(graphqlRequestClient(), {
    onSuccess: () => queryClient.invalidateQueries("providerProfileQuery"),
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
