import { useMutation, useQueryClient } from "react-query";

import { EDIT_OPERATING_TIME_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { DayTime, Message } from "api/generated/graphqlTypes";

import { IUseEditOperatingTime } from "./types";

export const useEditOperatingTime = ({ variables }: IUseEditOperatingTime) => {
  const queryClient = useQueryClient();

  const editOperatingTime = async () => {
    return graphqlRequestClient().request(
      EDIT_OPERATING_TIME_MUTATION,
      variables
    );
  };

  const {
    mutate: editOperatingTimeMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    editOperatingTime: { message: Message; operatingTime: DayTime };
  }>("editOperatingTime", editOperatingTime, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        "providerOperatingTimes",
        ({ providerOperatingTimes }) => {
          const newProviderOperatingTimes = providerOperatingTimes?.map(
            (providerOperatingTime: DayTime) => {
              if (
                providerOperatingTime.id ===
                data.editOperatingTime.operatingTime.id
              ) {
                return data.editOperatingTime.operatingTime;
              }
              return providerOperatingTime;
            }
          );

          return { providerOperatingTimes: newProviderOperatingTimes };
        }
      );
    },
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
