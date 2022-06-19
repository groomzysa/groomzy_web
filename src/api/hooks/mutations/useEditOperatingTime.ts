import { useQueryClient } from "react-query";

import { graphqlRequestClient } from "utils/graphqlClient";
import { useEditOperatingTimeMutation } from "api/generated/schema";

export const useEditOperatingTime = () => {
  const queryClient = useQueryClient();

  const {
    mutate: editOperatingTimeMutate,
    data,
    isLoading,
    error,
    isError,
  } = useEditOperatingTimeMutation(graphqlRequestClient(), {
    onSuccess: () =>
      queryClient.invalidateQueries("providerOperatingTimesQuery"),
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    editOperatingTimeMutate,
    message: data?.editOperatingTime?.message?.message,
    editOperatingTimeLoading: isLoading,
    editOperatingTimeErrorMessage: errorMessage,
    editOperatingTimeHasError: isError,
  };
};
