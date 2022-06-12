import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => {
  return {
    tooltipText: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "100%",
    },
  };
});
