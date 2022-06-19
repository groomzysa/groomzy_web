import { useQueryClient } from "react-query";

import { graphqlRequestClient } from "utils/graphqlClient";
import { useAddSocialMutation } from "api/generated/schema";

export const useAddSocial = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addSocialMutate,
    data,
    isLoading,
    error,
    isError,
  } = useAddSocialMutation(graphqlRequestClient(), {
    onSuccess: () => queryClient.invalidateQueries("providerSocialsQuery"),
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    addSocialMutate,
    message: data?.addSocial?.message?.message,
    addSocialLoading: isLoading,
    addSocialErrorMessage: errorMessage,
    addSocialHasError: isError,
  };
};
