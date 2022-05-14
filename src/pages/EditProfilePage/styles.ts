import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => {
  return {
    center: {
      position: "relative",
      top: 150,
    },
    padTop10: {
      paddingTop: 10,
    },
    streetNumber: {
      width: 150,
      paddingRight: 5,
    },
    widthMin: {
      minWidth: 300,
    },
  };
});
