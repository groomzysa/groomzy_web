import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    wrapper: {
      [theme.breakpoints.up("sm")]: {
        margin: 6,
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: 6,
        marginTop: 6,
        marginRight: 6,
      },
    },
    padRight5: {
      paddingRight: 5,
    },
    searchInput: {
      marginLeft: "6px !important",
      [theme.breakpoints.down("sm")]: {
        marginRight: "6px !important",
      },
    },
    categorySelect: {
      minWidth: 200,
      marginLeft: "6px !important",
      [theme.breakpoints.up("sm")]: {
        minWidth: 300,
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: "10px !important",
        marginLeft: "6px !important",
        width: "100%",
        marginRight: "6px !important",
      },
    },
  };
});
