import { useQueryClient } from "react-query";

import { graphqlRequestClient } from "utils/graphqlClient";
import { useDeleteOperatingTimeMutation } from "api/generated/schema";

export const useDeleteOperatingTime = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteOperatingTimeMutate,
    data,
    isLoading,
    error,
    isError,
  } = useDeleteOperatingTimeMutation(graphqlRequestClient(), {
    onSuccess: () =>
      queryClient.invalidateQueries("providerOperatingTimesQuery"),
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    deleteOperatingTimeMutate,
    message: data?.deleteOperatingTime?.message?.message,
    deleteOperatingTimeLoading: isLoading,
    deleteOperatingTimeErrorMessage: errorMessage,
    deleteOperatingTimeHasError: isError,
  };
};
