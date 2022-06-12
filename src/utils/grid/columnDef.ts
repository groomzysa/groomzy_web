import { GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid";
import { headerNameRenderer } from "./renderers";

export const defaultColumnDef = (
  classes: Record<"headerName", string>
): GridColDef => ({
  field: "",
  sortable: false,
  filterable: false,
  hideable: false,
  hideSortIcons: true,
  disableColumnMenu: true,
  flex: 1,
  renderHeader: (params: GridColumnHeaderParams) =>
    headerNameRenderer(params, classes),
});
