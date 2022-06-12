import { blue, blueGrey, red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => {
  return {
    viewAction: {
      color: blue[500],
    },
    deleteAction: {
      color: red[500],
    },
    headerName: {
      color: blueGrey[500],
      fontWeight: "bold",
    },
    menuItem: {
      "& .MuiMenuItem-root": {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
      },
    },
    actionsIcon: {
      cursor: "pointer",
    },
  };
});
