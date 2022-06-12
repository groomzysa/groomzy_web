import { useMutation, useQueryClient } from "react-query";

import { DELETE_STAFF_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Message, Staff } from "api/generated/graphqlTypes";

import { IUseDeleteStaff } from "./types";

export const useDeleteStaff = ({ variables }: IUseDeleteStaff) => {
  const queryClient = useQueryClient();

  const deleteStaff = async () => {
    return graphqlRequestClient().request(DELETE_STAFF_MUTATION, variables);
  };

  const {
    mutate: deleteStaffMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    deleteStaff: { message: Message; staff: Staff };
  }>("deleteStaff", deleteStaff, {
    onSuccess: (data) => {
      queryClient.setQueryData("providerStaffs", ({ providerStaffs }) => {
        const newProviderStaffs = providerStaffs.filter(
          (providerStaff: Staff) =>
            providerStaff.id !== data.deleteStaff.staff.id
        );
        return { providerStaffs: newProviderStaffs };
      });
    },
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
