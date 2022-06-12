import { DataGridProps } from "@mui/x-data-grid";

import { IUseGridSettings } from "./types";
import { useColumnDef } from "./useColumnDef";

export const useGridSettings = ({
  classes,
  gallery,
}: IUseGridSettings): DataGridProps => {
  const rows: any[] = [];

  /**
   *
   * Custom hooks
   *
   */
  const columns = useColumnDef({ classes });

  gallery.forEach((image) => {
    rows.push(image);
  });

  return {
    rows,
    columns,
    hideFooter: true,
    autoHeight: true,
  };
};
