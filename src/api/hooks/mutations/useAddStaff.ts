import { useQueryClient } from "react-query";

import { graphqlRequestClient } from "utils/graphqlClient";
import { useAddStaffMutation } from "api/generated/schema";

export const useAddStaff = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addStaffMutate,
    data,
    isLoading,
    error,
    isError,
  } = useAddStaffMutation(graphqlRequestClient(), {
    onSuccess: () => queryClient.invalidateQueries("providerStaffsQuery"),
  });

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return {
    addStaffMutate,
    message: data?.addStaff?.message?.message,
    addStaffLoading: isLoading,
    addStaffErrorMessage: errorMessage,
    addStaffHasError: isError,
  };
};
