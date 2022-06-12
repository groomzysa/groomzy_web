import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    drawerHeader: {
      padding: theme.spacing(1),
      backgroundColor: blueGrey[500],
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    white: {
      color: "white",
    },
    name: {
      maxWidth: 100,
      color: "white",
      paddingLeft: 5,
    },

    avatar: {
      "&.MuiAvatar-root": {
        backgroundColor: "whitesmoke",
        color: blueGrey[500],
      },
    },
  };
});
