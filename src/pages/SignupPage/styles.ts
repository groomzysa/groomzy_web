import { makeStyles } from "@mui/styles";
import { blueGrey, red } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    center: {
      position: "relative",
      top: 100,
    },
    padTop10: {
      paddingTop: 10,
    },
    button: {
      "&.MuiButton-root": {
        color: "white",
        backgroundColor: blueGrey[500],
        textTransform: "none",
        "&:hover": {
          backgroundColor: blueGrey[500],
        },
      },
    },
    phoneNumberInputError: {
      fontSize: 12,
      color: red[500],
      paddingLeft: 15,
    },
  };
});
