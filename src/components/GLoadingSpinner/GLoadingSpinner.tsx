import React, { FC } from "react";
import { Box, CircularProgress } from "@mui/material";

import { useStyles } from "./styles";
import { IGLoadingSpinnerProps } from "./types";

export const GLoadingSpinner: FC<IGLoadingSpinnerProps> = ({ size = 40 }) => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <CircularProgress className={classes.circularProgress} size={size} />
    </Box>
  );
};
