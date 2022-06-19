import { useQueryClient } from "react-query";

import { graphqlRequestClient } from "utils/graphqlClient";
import { useEditServiceMutation } from "api/generated/schema";

export const useEditService = () => {
  const queryClient = useQueryClient();

  const {
    mutate: editServiceMutate,
    data,
    isLoading,
    error,
    isError,
  } = useEditServiceMutation(graphqlRequestClient(), {
    onSuccess: () => queryClient.invalidateQueries("providerServicesQuery"),
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    editServiceMutate,
    message: data?.editService?.message?.message,
    editServiceLoading: isLoading,
    editServiceErrorMessage: errorMessage,
    editServiceHasError: isError,
  };
};
