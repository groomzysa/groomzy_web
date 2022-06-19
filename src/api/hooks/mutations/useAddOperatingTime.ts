import { useQueryClient } from "react-query";

import { graphqlRequestClient } from "utils/graphqlClient";
import { useAddOperatingTimeMutation } from "api/generated/schema";

export const useAddOperatingTime = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addOperatingTimeMutate,
    data,
    isLoading,
    error,
    isError,
  } = useAddOperatingTimeMutation(graphqlRequestClient(), {
    onSuccess: () =>
      queryClient.invalidateQueries("providerOperatingTimesQuery"),
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    addOperatingTimeMutate,
    message: data?.addOperatingTime?.message?.message,
    addOperatingTimeLoading: isLoading,
    addOperatingTimeErrorMessage: errorMessage,
    addOperatingTimeHasError: isError,
  };
};
