import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    center: {
      position: "relative",
    },
    padTop10: {
      paddingTop: 10,
    },
    padRight10: {
      paddingRight: 10,
    },
    marginBottom20: {
      marginBottom: 20,
    },
    streetNumber: {
      width: 200,
      paddingRight: 5,
    },
    province: {
      width: 250,
      paddingRight: 5,
    },
    widthMin: {
      minWidth: 300,
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
    newImage: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    button: {
      "&.MuiButton-root": {
        color: "white",
        backgroundColor: blueGrey[500],
        textTransform: "none",
        "&:hover": {
          backgroundColor: blueGrey[500],
        },
      },
    },
    img: {
      width: "auto",
      height: "100%",
      overflow: "hidden",
      objectFit: "contain",
    },
    imgName: {
      textTransform: "none",
    },
    imageContainer: {
      width: 200,
      height: "100%",
    },
  };
});
