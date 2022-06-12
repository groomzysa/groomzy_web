import { useMutation, useQueryClient } from "react-query";

import { ADD_OPERATING_TIME_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { DayTime, Message } from "api/generated/graphqlTypes";

import { IUseAddOperatingTime } from "./types";

export const useAddOperatingTime = ({ variables }: IUseAddOperatingTime) => {
  const queryClient = useQueryClient();

  const addOperatingTime = async () => {
    return graphqlRequestClient().request(
      ADD_OPERATING_TIME_MUTATION,
      variables
    );
  };

  const {
    mutate: addOperatingTimeMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    addOperatingTime: { message: Message; operatingTime: DayTime };
  }>("addOperatingTime", addOperatingTime, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        "providerOperatingTimes",
        ({ providerOperatingTimes }) => {
          const newProviderOperatingTimes = [
            data.addOperatingTime.operatingTime,
            ...providerOperatingTimes,
          ];
          return { providerOperatingTimes: newProviderOperatingTimes };
        }
      );
    },
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
