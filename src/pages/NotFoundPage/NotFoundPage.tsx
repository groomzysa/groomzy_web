import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Alert, Grid } from "@mui/material";

import { useStyles } from "./styles";
export const NotFoundPage: FC = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.center} container>
      <Grid item xs={0} sm={2} md={3} lg={4}></Grid>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Grid container direction="column" alignItems="center">
          <Grid item>404</Grid>
          <Grid item>Page not found</Grid>
        </Grid>
        <Grid item>
          <Alert severity="info">
            <Link to="/">Click here to go home</Link>
          </Alert>
        </Grid>
      </Grid>
      <Grid item xs={0} sm={2} md={3} lg={4}></Grid>
    </Grid>
  );
};
