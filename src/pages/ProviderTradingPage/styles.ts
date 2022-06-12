import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    padRight5: {
      paddingRight: 5,
    },
    service: {
      margin: 1,
    },
    bottomNavigationAction: {
      "&.MuiBottomNavigationAction-root": {
        "&.Mui-selected": {
          color: blueGrey[500],
        },
      },
    },
  };
});
