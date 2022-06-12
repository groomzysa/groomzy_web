import { useMutation, useQueryClient } from "react-query";

import { DELETE_SERVICE_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Message, Service } from "api/generated/graphqlTypes";

import { IUseDeleteService } from "./types";

export const useDeleteService = ({ variables }: IUseDeleteService) => {
  const queryClient = useQueryClient();

  const deleteService = async () => {
    return graphqlRequestClient().request(DELETE_SERVICE_MUTATION, variables);
  };

  const {
    mutate: deleteServiceMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    deleteService: { message: Message; service: Service };
  }>("deleteService", deleteService, {
    onSuccess: (data) => {
      queryClient.setQueryData("providerServices", ({ providerServices }) => {
        const newProviderServices = providerServices.filter(
          (providerService: Service) =>
            providerService.id !== data.deleteService.service.id
        );
        return { providerServices: newProviderServices };
      });
    },
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
