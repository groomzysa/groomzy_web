import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    drawerHeader: {
      ...theme.mixins.toolbar,
    },
  };
});
