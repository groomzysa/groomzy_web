import React, { FC } from "react";
import { Grid, Box } from "@mui/material";

import { IGCenterMessageProps } from "./types";
import { useStyles } from "./styles";

export const GCenterMessage: FC<IGCenterMessageProps> = ({ message }) => {
  const classes = useStyles();

  return (
    <Grid>
      <Box className={classes.wrapper}>{message}</Box>
    </Grid>
  );
};
