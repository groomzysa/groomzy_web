import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { defaultColumnDef } from "utils/grid/columnDef";

import { IUseColumnDef } from "./types";
import { NamedActionsCellRenderer } from "../components";

export const useColumnDef = ({ classes }: IUseColumnDef) => {
  const _defaultColumnDef = defaultColumnDef(classes);
  const columns: GridColDef[] = [
    {
      ..._defaultColumnDef,
      field: "title",
      headerName: "Title",
      minWidth: 120,
      headerClassName: classes.headerName,
    },
    {
      ..._defaultColumnDef,
      field: "category",
      headerName: "Category",
      minWidth: 120,
      headerClassName: classes.headerName,
    },
    {
      ..._defaultColumnDef,
      field: "price",
      headerName: "Price",
      minWidth: 120,
      headerClassName: classes.headerName,
    },
    {
      ..._defaultColumnDef,
      field: "duration",
      headerName: "Duration",
      minWidth: 120,
      headerClassName: classes.headerName,
    },
    {
      ..._defaultColumnDef,
      field: "durationunit",
      headerName: "Duration unit",
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
