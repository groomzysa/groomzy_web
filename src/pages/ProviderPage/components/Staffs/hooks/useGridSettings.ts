import { DataGridProps } from "@mui/x-data-grid";

import { IUseGridSettings } from "./types";
import { useColumnDef } from "./useColumnDef";

export const useGridSettings = ({
  classes,
  providerStaffs,
}: IUseGridSettings): DataGridProps => {
  const rows: any[] = [];

  /**
   *
   * Custom hooks
   *
   */
  const columns = useColumnDef({ classes });

  providerStaffs.forEach((providerStaff) => {
    const { id, fullName } = providerStaff;
    rows.push({
      id,
      fullname: fullName,
    });
  });

  return {
    rows,
    columns,
    hideFooter: true,
    autoHeight: true,
  };
};
