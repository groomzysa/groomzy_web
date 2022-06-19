import React, { FC } from "react";
import { Grid, Box } from "@mui/material";

import { IGCenterMessageProps } from "./types";
import { useStyles } from "./styles";

export const GCenterMessage: FC<IGCenterMessageProps> = ({ message }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item md={4}></Grid>
      <Grid item md={4}>
        <Box className={classes.wrapper}>{message}</Box>
      </Grid>
      <Grid item md={4}></Grid>
    </Grid>
  );
};
