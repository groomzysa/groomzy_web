import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    button: {
      "&.MuiButton-root": {
        borderColor: blueGrey[500],
        textTransform: "none",
        color: "GrayText",
        "&:hover": {
          borderColor: blueGrey[500],
          backgroundColor: "none",
        },
      },
    },
    circularProgress: {
      "&.MuiCircularProgress-root": {
        "&.MuiCircularProgress-colorPrimary": {
          color: blueGrey[500],
        },
      },
    },
  };
});
