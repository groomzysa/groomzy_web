import { useMutation, useQueryClient } from "react-query";

import { ADD_GALLERY_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Message, ProviderGallery } from "api/generated/graphqlTypes";

import { IUseAddGallery } from "./types";

export const useAddGallery = ({ variables }: IUseAddGallery) => {
  const queryClient = useQueryClient();

  const addGallery = async () => {
    return graphqlRequestClient().request(ADD_GALLERY_MUTATION, variables);
  };

  const {
    mutate: addGalleryMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    addGallery: { message: Message; gallery: ProviderGallery };
  }>("addGallery", addGallery, {
    onSuccess: (data) => {
      queryClient.setQueryData("providerGallery", ({ providerGallery }) => {
        const newProviderGallery = [
          data.addGallery.gallery,
          ...providerGallery,
        ];
        return { providerGallery: newProviderGallery };
      });
    },
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    addGalleryMutate,
    message: data?.addGallery?.message?.message,
    addGalleryLoading: isLoading,
    addGalleryErrorMessage: errorMessage,
    addGalleryHasError: isError,
  };
};
