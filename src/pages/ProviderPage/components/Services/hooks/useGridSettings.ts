import { DataGridProps } from "@mui/x-data-grid";

import { IUseGridSettings } from "./types";
import { useColumnDef } from "./useColumnDef";

export const useGridSettings = ({
  classes,
  providerServices,
}: IUseGridSettings): DataGridProps => {
  const rows: any[] = [];

  /**
   *
   * Custom hooks
   *
   */
  const columns = useColumnDef({ classes });

  providerServices.forEach((providerService) => {
    const { serviceProviderCategories } = providerService;

    rows.push({
      ...providerService,
      category: serviceProviderCategories?.[0]?.category?.category,
      durationunit: providerService.durationUnit,
    });
  });

  return {
    rows,
    columns,
    hideFooter: true,
    autoHeight: true,
  };
};
