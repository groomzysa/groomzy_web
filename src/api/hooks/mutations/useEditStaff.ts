import { useQueryClient } from "react-query";

import { graphqlRequestClient } from "utils/graphqlClient";
import { useEditStaffMutation } from "api/generated/schema";

export const useEditStaff = () => {
  const queryClient = useQueryClient();

  const {
    mutate: editStaffMutate,
    data,
    isLoading,
    error,
    isError,
  } = useEditStaffMutation(graphqlRequestClient(), {
    onSuccess: () => queryClient.invalidateQueries("providerStaffsQuery"),
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    editStaffMutate,
    message: data?.editStaff?.message?.message,
    editStaffLoading: isLoading,
    editStaffErrorMessage: errorMessage,
    editStaffHasError: isError,
  };
};
