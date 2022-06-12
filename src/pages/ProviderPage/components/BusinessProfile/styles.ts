import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

export const useStyles = makeStyles(() => {
  return {
    tabList: {
      "&.MuiTabs-root": {
        "& .MuiTabs-indicator": {
          backgroundColor: blueGrey[500],
        },
      },
    },
    tab: {
      "&.MuiTab-root": {
        textTransform: "none",
        "&.Mui-selected": {
          color: blueGrey[500],
          textTransform: "none",
          fontWeight: "bold",
        },
      },
    },
  };
});
