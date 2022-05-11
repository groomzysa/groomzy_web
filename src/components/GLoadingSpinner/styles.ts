import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    circularProgress: {
      "&.MuiCircularProgress-root": {
        "&.MuiCircularProgress-colorPrimary": {
          color: blueGrey[500],
        },
      },
    },
  };
});
