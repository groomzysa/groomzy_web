import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    link: {
      textDecoration: "none",
      color: "MenuText",
    },
  };
});
