import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    checkBox: {
      "&.MuiCheckbox-root": {
        color: blueGrey[500],
        "&.Mui-checked": {
          color: blueGrey[500],
        },
      },
    },
  };
});
