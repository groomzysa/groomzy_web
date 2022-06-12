import { useMutation, useQueryClient } from "react-query";

import { EDIT_SOCIAL_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Message, ProviderSocial } from "api/generated/graphqlTypes";

import { IUseEditSocial } from "./types";

export const useEditSocial = ({ variables }: IUseEditSocial) => {
  const queryClient = useQueryClient();

  const editSocial = async () => {
    return graphqlRequestClient().request(EDIT_SOCIAL_MUTATION, variables);
  };

  const {
    mutate: editSocialMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    editSocial: { message: Message; social: ProviderSocial };
  }>("editSocial", editSocial, {
    onSuccess: (data) => {
      //@ts-ignore
      queryClient.setQueryData("providerSocials", ({ providerSocials }) => {
        const newProviderSocials = providerSocials?.map(
          (providerSocial: ProviderSocial) => {
            if (providerSocial.id === data.editSocial.social.id) {
              return data.editSocial.social;
            }
            return providerSocial;
          }
        );

        return { providerSocials: newProviderSocials };
      });
    },
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
