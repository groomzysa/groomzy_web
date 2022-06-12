import { useMutation, useQueryClient } from "react-query";

import { ADD_STAFF_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Message, Staff } from "api/generated/graphqlTypes";

import { IUseAddStaff } from "./types";

export const useAddStaff = ({ variables }: IUseAddStaff) => {
  const queryClient = useQueryClient();

  const addStaff = async () => {
    return graphqlRequestClient().request(ADD_STAFF_MUTATION, variables);
  };

  const {
    mutate: addStaffMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    addStaff: { message: Message; staff: Staff };
  }>("addStaff", addStaff, {
    onSuccess: (data) => {
      queryClient.setQueryData("providerStaffs", ({ providerStaffs }) => {
        const newProviderStaffs = [data.addStaff.staff, ...providerStaffs];
        return { providerStaffs: newProviderStaffs };
      });
    },
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
