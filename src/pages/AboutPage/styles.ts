import { blueGrey, grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => {
  return {
    heading: {
      color: blueGrey[500],
      fontSize: 24,
      fontWeight: "bold",
    },
    subHeading: {
      color: grey[500],
      fontStyle: "italic",
    },
    padBottom10: {
      paddingBottom: 10,
    },
  };
});
