import { useMutation, useQueryClient } from "react-query";

import { EDIT_SERVICE_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Message, Service } from "api/generated/graphqlTypes";

import { IUseEditService } from "./types";

export const useEditService = ({ variables }: IUseEditService) => {
  const queryClient = useQueryClient();

  const editService = async () => {
    return graphqlRequestClient().request(EDIT_SERVICE_MUTATION, variables);
  };

  const {
    mutate: editServiceMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    editService: { message: Message; service: Service };
  }>("editService", editService, {
    onSuccess: (data) => {
      //@ts-ignore
      queryClient.setQueryData("providerServices", ({ providerServices }) => {
        const newProviderServices = providerServices?.map(
          (providerService: Service) => {
            if (providerService.id === data.editService.service.id) {
              return data.editService.service;
            }
            return providerService;
          }
        );

        return { providerServices: newProviderServices };
      });
    },
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
