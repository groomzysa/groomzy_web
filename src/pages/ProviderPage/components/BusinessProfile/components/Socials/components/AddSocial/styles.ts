import { makeStyles } from "@mui/styles";
import { blueGrey, red } from "@mui/material/colors";

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
    addButton: {
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
    cancelButton: {
      "&.MuiButton-root": {
        borderColor: red[500],
        color: red[500],
        textTransform: "none",
        "&:hover": {
          borderColor: red[500],
          color: red[500],
        },
      },
    },
  };
});
