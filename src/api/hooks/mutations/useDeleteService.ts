import { useQueryClient } from "react-query";

import { graphqlRequestClient } from "utils/graphqlClient";
import { useDeleteServiceMutation } from "api/generated/schema";

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteServiceMutate,
    data,
    isLoading,
    error,
    isError,
  } = useDeleteServiceMutation(graphqlRequestClient(), {
    onSuccess: () => queryClient.invalidateQueries("providerServicesQuery"),
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    deleteServiceMutate,
    message: data?.deleteService?.message?.message,
    deleteServiceLoading: isLoading,
    deleteServiceErrorMessage: errorMessage,
    deleteServiceHasError: isError,
  };
};
