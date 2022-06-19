import { useQueryClient } from "react-query";

import { graphqlRequestClient } from "utils/graphqlClient";
import { useAddServiceMutation } from "api/generated/schema";

export const useAddService = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addServiceMutate,
    data,
    isLoading,
    error,
    isError,
  } = useAddServiceMutation(graphqlRequestClient(), {
    onSuccess: () => queryClient.invalidateQueries("providerServicesQuery"),
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    addServiceMutate,
    message: data?.addService?.message?.message,
    addServiceLoading: isLoading,
    addServiceErrorMessage: errorMessage,
    addServiceHasError: isError,
  };
};
