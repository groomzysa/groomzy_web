import { blue, green, orange, pink, purple } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => {
  return {
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
        backgroundColor: orange[500],
        color: "white",
      },
    },
  };
});
