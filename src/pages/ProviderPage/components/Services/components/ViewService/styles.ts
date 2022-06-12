import { blueGrey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => {
  return {
    header: {
      color: blueGrey[500],
      fontWeight: "bold",
      width: 100,
    },
  };
});
