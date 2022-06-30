import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    wrapper: {
      [theme.breakpoints.up("sm")]: {
        margin: 6,
        marginRight: 10,
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: 6,
        marginTop: 6,
        marginRight: 10,
      },
    },
    padRight5: {
      paddingRight: 5,
    },
    searchInput: {
      paddingLeft: 6,
      [theme.breakpoints.down("sm")]: {
        paddingRight: 10,
      },
    },
    categorySelect: {
      minWidth: 200,
      paddingLeft: 10,
      [theme.breakpoints.up("sm")]: {
        minWidth: 300,
      },
      [theme.breakpoints.down("sm")]: {
        paddingTop: 5,
        paddingLeft: 5,
        width: "100%",
        paddingRight: 10,
      },
    },
  };
});
