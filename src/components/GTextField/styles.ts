import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    textField: {
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "lightgray",
        },
      },
      "& label.Mui-focused": {
        color: blueGrey[500],
      },
    },
  };
});
