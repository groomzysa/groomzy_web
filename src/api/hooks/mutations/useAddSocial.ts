import { useMutation, useQueryClient } from "react-query";

import { ADD_SOCIAL_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Message, Staff } from "api/generated/graphqlTypes";

import { IUseAddSocial } from "./types";

export const useAddSocial = ({ variables }: IUseAddSocial) => {
  const queryClient = useQueryClient();

  const addSocial = async () => {
    return graphqlRequestClient().request(ADD_SOCIAL_MUTATION, variables);
  };

  const {
    mutate: addSocialMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    addSocial: { message: Message; social: Staff };
  }>("addSocial", addSocial, {
    onSuccess: (data) => {
      queryClient.setQueryData("providerSocials", ({ providerSocials }) => {
        const newProviderSocials = [data.addSocial.social, ...providerSocials];
        return { providerSocials: newProviderSocials };
      });
    },
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
