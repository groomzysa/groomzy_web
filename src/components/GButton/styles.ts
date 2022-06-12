import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    button: {
      "& .MuiLoadingButton-root": {
        backgroundColor: blueGrey[500],
        textTransform: "none",
        "&:hover": {
          backgroundColor: blueGrey[500],
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
