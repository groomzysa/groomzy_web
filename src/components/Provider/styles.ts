import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => {
  return {
    noPointer: {
      "&:hover": {
        cursor: "default",
        backgroundColor: "white",
      },
    },
  };
});
