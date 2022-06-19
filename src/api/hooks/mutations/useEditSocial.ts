import { useQueryClient } from "react-query";

import { graphqlRequestClient } from "utils/graphqlClient";
import { useEditSocialMutation } from "api/generated/schema";

export const useEditSocial = () => {
  const queryClient = useQueryClient();

  const {
    mutate: editSocialMutate,
    data,
    isLoading,
    error,
    isError,
  } = useEditSocialMutation(graphqlRequestClient(), {
    onSuccess: () => queryClient.invalidateQueries("providerSocialsQuery"),
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    editSocialMutate,
    message: data?.editSocial?.message?.message,
    editSocialLoading: isLoading,
    editSocialErrorMessage: errorMessage,
    editSocialHasError: isError,
  };
};
