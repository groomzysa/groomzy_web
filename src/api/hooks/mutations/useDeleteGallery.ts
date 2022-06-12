import { useMutation, useQueryClient } from "react-query";

import { DELETE_GALLERY_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Message, ProviderGallery } from "api/generated/graphqlTypes";

import { IUseDeleteGallery } from "./types";

export const useDeleteGallery = ({ variables }: IUseDeleteGallery) => {
  const queryClient = useQueryClient();

  const deleteGallery = async () => {
    return graphqlRequestClient().request(DELETE_GALLERY_MUTATION, variables);
  };

  const {
    mutate: deleteGalleryMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    deleteGallery: { message: Message; gallery: ProviderGallery };
  }>("deleteGallery", deleteGallery, {
    onSuccess: (data) => {
      queryClient.setQueryData("providerGallery", ({ providerGallery }) => {
        const newProviderGallery = providerGallery.filter(
          (providerGallery: ProviderGallery) =>
            providerGallery.id !== data.deleteGallery.gallery.id
        );
        return { providerGallery: newProviderGallery };
      });
    },
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    deleteGalleryMutate,
    message: data?.deleteGallery?.message?.message,
    deleteGalleryLoading: isLoading,
    deleteGalleryErrorMessage: errorMessage,
    deleteGalleryHasError: isError,
  };
};
