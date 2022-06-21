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
      },
    },
    padRight5: {
      paddingRight: 5,
    },
    searchInput: {
      paddingLeft: 6,
    },
    categorySelect: {
      minWidth: 150,
      paddingLeft: 10,
      [theme.breakpoints.up("sm")]: {
        minWidth: 400,
      },
    },
  };
});
