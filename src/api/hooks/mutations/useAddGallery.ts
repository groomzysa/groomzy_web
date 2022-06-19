import { useQueryClient } from "react-query";

import { graphqlRequestClient } from "utils/graphqlClient";
import { useAddGalleryMutation } from "api/generated/schema";

export const useAddGallery = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addGalleryMutate,
    data,
    isLoading,
    error,
    isError,
  } = useAddGalleryMutation(graphqlRequestClient(), {
    onSuccess: () => queryClient.invalidateQueries("providerGalleryQuery"),
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
