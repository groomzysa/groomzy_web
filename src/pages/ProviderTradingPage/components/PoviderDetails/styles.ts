import { makeStyles } from "@mui/styles";
import { blueGrey, grey } from "@mui/material/colors";
import { Theme } from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => {
  return {
    mapWrapper: {
      height: 300,
      width: "100%",
    },
    operatingTitle: {
      paddingTop: 10,
      paddingBottom: 10,
      color: blueGrey[500],
      fontSize: 26,
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        fontSize: 20,
      },
    },
    timeSeperator: {
      paddingRight: 10,
      paddingLeft: 10,
    },
    dayTimes: {
      fontWeight: "bold",
      fontSize: 18,
      color: grey[500],
      [theme.breakpoints.down("sm")]: {
        fontSize: 16,
      },
    },
  };
});
