import { makeStyles } from "@mui/styles";
import { orange } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      margin: "auto",
      position: "absolute",
      top: "50%",
      left: "40%",
      transform: "translateY(-50%)",
      color: orange[500],
      maxWidth: 250,
    },
  };
});
