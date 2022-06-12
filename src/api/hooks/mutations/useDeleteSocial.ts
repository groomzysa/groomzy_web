import { useMutation, useQueryClient } from "react-query";

import { DELETE_SOCIAL_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Message, ProviderSocial } from "api/generated/graphqlTypes";

import { IUseDeleteSocial } from "./types";

export const useDeleteSocial = ({ variables }: IUseDeleteSocial) => {
  const queryClient = useQueryClient();

  const deleteSocial = async () => {
    return graphqlRequestClient().request(DELETE_SOCIAL_MUTATION, variables);
  };

  const {
    mutate: deleteSocialMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    deleteSocial: { message: Message; social: ProviderSocial };
  }>("deleteSocial", deleteSocial, {
    onSuccess: (data) => {
      queryClient.setQueryData("providerSocials", ({ providerSocials }) => {
        const newProviderSocials = providerSocials.filter(
          (providerSocial: ProviderSocial) =>
            providerSocial.id !== data.deleteSocial.social.id
        );
        return { providerSocials: newProviderSocials };
      });
    },
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
