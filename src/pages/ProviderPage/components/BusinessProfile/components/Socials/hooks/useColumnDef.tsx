import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { defaultColumnDef } from "utils/grid/columnDef";

import { IUseColumnDef } from "./types";
import { NamedActionsCellRenderer } from "../components";

export const useColumnDef = ({ classes }: IUseColumnDef) => {
  const _defaultColumnDef = defaultColumnDef(classes);
  const columns: GridColDef[] = [
    {
      ..._defaultColumnDef,
      field: "name",
      headerName: "Social name",
      minWidth: 120,
      headerClassName: classes.headerName,
    },
    {
      ..._defaultColumnDef,
      field: "url",
      headerName: "Social url",
      minWidth: 120,
      headerClassName: classes.headerName,
    },
    {
      ..._defaultColumnDef,
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      headerClassName: classes.headerName,
      renderCell: (params: GridRenderCellParams) => (
        <NamedActionsCellRenderer params={params} />
      ),
    },
  ];
  return columns;
};
