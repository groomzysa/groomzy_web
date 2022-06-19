import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    mapWrapper: {
      height: 350,
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
    },
    timeSeperator: {
      paddingRight: 10,
      paddingLeft: 10,
    },
    dayTimes: {
      fontWeight: "bold",
      fontSize: 18,
    },
  };
});
