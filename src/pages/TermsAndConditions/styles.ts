import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    pageTitles: {
      "& h1, h2, h3": {
        color: blueGrey[500],
      },
    },
  };
});
