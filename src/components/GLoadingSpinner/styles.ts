import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
