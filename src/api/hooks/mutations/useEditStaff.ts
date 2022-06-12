import { useMutation, useQueryClient } from "react-query";

import { EDIT_STAFF_MUTATION } from "api/graphql/mutations";
import { graphqlRequestClient } from "utils/graphqlClient";
import { Message, Staff } from "api/generated/graphqlTypes";

import { IUseEditStaff } from "./types";

export const useEditStaff = ({ variables }: IUseEditStaff) => {
  const queryClient = useQueryClient();

  const editStaff = async () => {
    return graphqlRequestClient().request(EDIT_STAFF_MUTATION, variables);
  };

  const {
    mutate: editStaffMutate,
    data,
    isLoading,
    error,
    isError,
  } = useMutation<{
    editStaff: { message: Message; staff: Staff };
  }>("editStaff", editStaff, {
    onSuccess: (data) => {
      //@ts-ignore
      queryClient.setQueryData("providerStaffs", ({ providerStaffs }) => {
        const newProviderStaffs = providerStaffs?.map(
          (providerStaff: Staff) => {
            if (providerStaff.id === data.editStaff.staff.id) {
              return data.editStaff.staff;
            }
            return providerStaff;
          }
        );

        return { providerStaffs: newProviderStaffs };
      });
    },
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
