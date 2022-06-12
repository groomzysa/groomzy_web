import { DataGridProps } from "@mui/x-data-grid";

import { IUseGridSettings } from "./types";
import { useColumnDef } from "./useColumnDef";

export const useGridSettings = ({
  classes,
  socials,
}: IUseGridSettings): DataGridProps => {
  const rows: any[] = [];

  /**
   *
   * Custom hooks
   *
   */
  const columns = useColumnDef({ classes });

  socials.forEach((social) => {
    rows.push(social);
  });

  return {
    rows,
    columns,
    hideFooter: true,
    autoHeight: true,
  };
};
