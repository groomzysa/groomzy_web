import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    bottomNavigationAction: {
      "&.MuiBottomNavigationAction-root": {
        "&.Mui-selected": {
          color: blueGrey[500],
        },
      },
    },
  };
});
