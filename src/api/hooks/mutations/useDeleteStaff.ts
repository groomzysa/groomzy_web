import { useQueryClient } from "react-query";

import { graphqlRequestClient } from "utils/graphqlClient";
import { useDeleteStaffMutation } from "api/generated/schema";

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteStaffMutate,
    data,
    isLoading,
    error,
    isError,
  } = useDeleteStaffMutation(graphqlRequestClient(), {
    onSuccess: () => queryClient.invalidateQueries("providerStaffsQuery"),
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    deleteStaffMutate,
    message: data?.deleteStaff?.message?.message,
    deleteStaffLoading: isLoading,
    deleteStaffErrorMessage: errorMessage,
    deleteStaffHasError: isError,
  };
};
