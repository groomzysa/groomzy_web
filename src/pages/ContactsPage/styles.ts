import { makeStyles } from "@mui/styles";
import { blue, blueGrey, red } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    center: {
      position: "relative",
      margin: "auto",
      left: "0%",
    },
    heading: {
      color: blueGrey[500],
      fontWeight: "bold",
    },
    padTop10: {
      paddingTop: 10,
    },
    pad10: {
      padding: 10,
    },
    instagram: {
      color: red[500],
    },
    facebook: {
      color: blue[500],
    },
    cursor: {
      cursor: "pointer",
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
