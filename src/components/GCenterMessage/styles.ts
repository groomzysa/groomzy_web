import { makeStyles } from "@mui/styles";
import { orange } from "@mui/material/colors";
import { Theme } from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    wrapper: {
      margin: "auto",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      color: orange[500],
      [theme.breakpoints.up("sm")]: {
        left: "40%",
        maxWidth: 350,
      },
    },
  };
});
