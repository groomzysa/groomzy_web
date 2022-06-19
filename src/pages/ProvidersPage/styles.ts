import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => {
  return {
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
