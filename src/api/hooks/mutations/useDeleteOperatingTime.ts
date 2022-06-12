import { useMutation, useQueryClient } from "react-query";

import { DELETE_OPERATING_TIME_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { DayTime, Message } from "api/generated/graphqlTypes";

import { IUseDeleteOperatingTime } from "./types";

export const useDeleteOperatingTime = ({
  variables,
}: IUseDeleteOperatingTime) => {
  const queryClient = useQueryClient();

  const deleteOperatingTime = async () => {
    return graphqlRequestClient().request(
      DELETE_OPERATING_TIME_MUTATION,
      variables
    );
  };

  const {
    mutate: deleteOperatingTimeMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    deleteOperatingTime: { message: Message; operatingTime: DayTime };
  }>("deleteOperatingTime", deleteOperatingTime, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        "providerOperatingTimes",
        ({ providerOperatingTimes }) => {
          const newProviderOperatingTimes = providerOperatingTimes.filter(
            (providerOperatingTime: DayTime) =>
              providerOperatingTime.id !==
              data.deleteOperatingTime.operatingTime.id
          );
          return { providerOperatingTimes: newProviderOperatingTimes };
        }
      );
    },
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
