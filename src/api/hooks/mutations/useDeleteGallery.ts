import { useQueryClient } from "react-query";

import { graphqlRequestClient } from "utils/graphqlClient";
import { useDeleteGalleryMutation } from "api/generated/schema";

export const useDeleteGallery = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteGalleryMutate,
    data,
    isLoading,
    error,
    isError,
  } = useDeleteGalleryMutation(graphqlRequestClient(), {
    onSuccess: () => queryClient.invalidateQueries("providerGalleryQuery"),
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
