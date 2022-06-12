import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    center: {
      margin: "auto",
      position: "relative",
      top: "50%",
      left: "35%",
      transform: "translateY(-50%)",
      maxWidth: 250,
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
  };
});
