import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    price: {
      position: "relative",
      top: 6,
      fontWeight: "bold",
      fontStyle: "italic",
    },
    title: {
      color: blueGrey[500],
      fontWeight: "bold",
      fontSize: 16,
    },
    description: {
      fontSize: 14,
      minHeight: 40,
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
    },
    cardContent: {
      "&.MuiCardContent-root": {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  };
});
