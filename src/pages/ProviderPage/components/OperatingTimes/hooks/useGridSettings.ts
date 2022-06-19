import { DataGridProps } from "@mui/x-data-grid";

import { IUseGridSettings } from "./types";
import { useColumnDef } from "./useColumnDef";

export const useGridSettings = ({
  classes,
  providerOperatingTimes,
}: IUseGridSettings): DataGridProps => {
  const rows: any[] = [];

  /**
   *
   * Custom hooks
   *
   */
  const columns = useColumnDef({ classes });

  providerOperatingTimes.forEach((providerOperatingTime) => {
    const { id, day, time } = providerOperatingTime;

    rows.push({
      id,
      day: day?.day,
      starttime: time?.startTime,
      endtime: time?.endTime,
    });
  });

  return {
    rows,
    columns,
    hideFooter: true,
    autoHeight: true,
  };
};
