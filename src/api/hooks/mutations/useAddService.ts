import { useMutation, useQueryClient } from "react-query";

import { ADD_SERVICE_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Message, Service } from "api/generated/graphqlTypes";

import { IUseAddService } from "./types";

export const useAddService = ({ variables }: IUseAddService) => {
  const queryClient = useQueryClient();

  const addService = async () => {
    return graphqlRequestClient().request(ADD_SERVICE_MUTATION, variables);
  };

  const {
    mutate: addServiceMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    addService: { message: Message; service: Service };
  }>("addService", addService, {
    onSuccess: (data) => {
      queryClient.setQueryData("providerServices", ({ providerServices }) => {
        const newProviderServices = [
          data.addService.service,
          ...providerServices,
        ];
        return { providerServices: newProviderServices };
      });
    },
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
