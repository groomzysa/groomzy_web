import React, { FC } from "react";
import { CircularProgress } from "@mui/material";

import { useStyles } from "./styles";
import { IGLoadingSpinnerProps } from "./types";

export const GLoadingSpinner: FC<IGLoadingSpinnerProps> = ({ size = 40 }) => {
  const classes = useStyles();

  return <CircularProgress className={classes.circularProgress} size={size} />;
};
