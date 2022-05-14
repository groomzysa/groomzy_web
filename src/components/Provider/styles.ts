import { blue, blueGrey, green, pink, purple, red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => {
  return {
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
    baberChip: {
      "&.MuiChip-root": {
        backgroundColor: blue[500],
        color: "white",
      },
    },
    makeupArtistChip: {
      "&.MuiChip-root": {
        backgroundColor: pink[500],
        color: "white",
      },
    },
    nailTechinicianChip: {
      "&.MuiChip-root": {
        backgroundColor: purple[500],
        color: "white",
      },
    },
    hairdresserChip: {
      "&.MuiChip-root": {
        backgroundColor: green[500],
        color: "white",
      },
    },
    spaChip: {
      "&.MuiChip-root": {
        backgroundColor: red[500],
        color: "white",
      },
    },
    chipCaontainer: {
      paddingRight: 5,
    },
    favIcon: {
      color: "transparent",
      "&:hover": {
        color: red[400],
      },
    },
    avatar: {
      color: blueGrey[500],
    },
    avatarText: {
      color: "white",
      fontWeight: "bold",
    },
  };
});
