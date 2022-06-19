import { useQueryClient } from "react-query";

import { graphqlRequestClient } from "utils/graphqlClient";
import { useDeleteSocialMutation } from "api/generated/schema";

export const useDeleteSocial = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteSocialMutate,
    data,
    isLoading,
    error,
    isError,
  } = useDeleteSocialMutation(graphqlRequestClient(), {
    onSuccess: () => queryClient.invalidateQueries("providerSocialsQuery"),
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    deleteSocialMutate,
    message: data?.deleteSocial?.message?.message,
    deleteSocialLoading: isLoading,
    deleteSocialErrorMessage: errorMessage,
    deleteSocialHasError: isError,
  };
};
