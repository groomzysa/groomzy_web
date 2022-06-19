import { Theme } from "@mui/material";
import { orange, blue, blueGrey, red, green } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    tableWrapper: {
      height: "auto",
      overflow: "auto",
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        position: "relative",
        left: "25%",
        width: "50%",
      },
    },
    dataGrid: {
      "&.MuiDataGrid-root": {
        "& .MuiDataGrid-columnHeader": {
          "&:focus-within": {
            outline: "none !important",
          },
        },
        "& .MuiDataGrid-row": {
          backgroundColor: "transparent !important",
          "&:hover": {
            backgroundColor: "transparent !important",
          },
        },
        "& .MuiDataGrid-cell": {
          "&:focus-within": {
            outline: "none !important",
          },
        },
      },
    },
    padRight10: {
      paddingRight: 10,
    },
    padTop10: {
      paddingTop: 10,
    },
    addButton: {
      "&.MuiButton-root": {
        borderColor: green[500],
        color: green[500],
        textTransform: "none",
        "&:hover": {
          borderColor: green[500],
          color: green[500],
        },
      },
    },
    viewButton: {
      "&.MuiButton-root": {
        borderColor: blue[500],
        color: blue[500],
        textTransform: "none",
        "&:hover": {
          borderColor: blue[500],
          color: blue[500],
        },
      },
    },
    editButton: {
      "&.MuiButton-root": {
        borderColor: orange[500],
        color: orange[500],
        textTransform: "none",
        "&:hover": {
          borderColor: orange[500],
          color: orange[500],
        },
      },
    },
    deleteButton: {
      "&.MuiButton-root": {
        borderColor: red[500],
        color: red[500],
        textTransform: "none",
        "&:hover": {
          borderColor: red[500],
          color: red[500],
        },
      },
    },
    headerName: {
      color: blueGrey[500],
      fontWeight: "bold",
    },
  };
});
