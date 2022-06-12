import { blueGrey, red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => {
  return {
    header: {
      color: blueGrey[500],
      fontWeight: "bold",
      width: 100,
    },
    padRight10: {
      paddingRight: 10,
    },
    padTop10: {
      paddingTop: 10,
    },
    addButton: {
      "&.MuiButton-root": {
        borderColor: blueGrey[500],
        color: blueGrey[500],
        textTransform: "none",
        "&:hover": {
          borderColor: blueGrey[500],
          color: blueGrey[500],
        },
      },
    },
    cancelButton: {
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
    timeInputLabel: {
      width: 200,
    },
  };
});
