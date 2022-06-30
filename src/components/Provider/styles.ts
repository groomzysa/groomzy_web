import { blueGrey, red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => {
  return {
    wrapper: {
      height: 400,
    },
    cardContent: {
      "&.MuiCardContent-root": {
        padding: 0,
      },
    },
    noPointer: {
      "&:hover": {
        cursor: "default",
        backgroundColor: "white",
      },
    },
    locationDistance: {
      position: "relative",
      right: 15,
    },
    locationIcon: {
      position: "relative",
      top: -2,
      right: 10,
    },
    chipCaontainer: {
      paddingRight: 5,
      paddingBottom: 5,
    },
    favIcon: {
      color: "transparent",
      "&:hover": {
        color: red[400],
      },
    },
    avatar: {
      "&.MuiAvatar-root": {
        backgroundColor: "whitesmoke",
        color: blueGrey[500],
      },
    },
    avatarText: {
      color: "white",
      fontWeight: "bold",
    },
    actions: {
      justifyContent: "space-between",
    },
    button: {
      "&.MuiButton-root": {
        borderColor: blueGrey[500],
        color: blueGrey[500],
        textTransform: "none",
        "&:hover": {
          borderColor: blueGrey[500],
          color: blueGrey[500],
        },
      },
    },
    address: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    categories: {
      position: "relative",
      display: "flex",
      width: "100%",
      overflowX: "auto",
      paddingTop: 2,
      height: 45,
      paddingLeft: 10,
    },
    carousel: {
      height: 200,
    },
    carouselImg: {
      objectFit: "cover",
      width: "100%",
      height: "100%",
    },
  };
});
