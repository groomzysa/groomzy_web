import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Divider, Grid, Typography } from "@mui/material";

import { useFetchStaff } from "api/hooks/queries";
import { setLocalStorage } from "utils/localStorage";
import { GDialogBox } from "components";

import { useStyles } from "./styles";

export const ViewStaff: FC = () => {
  const { id, staffId } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { staff, isLoading, fetchStaffErrorMessage } = useFetchStaff({
    variables: { id: Number(staffId) },
  });

  /**
   *
   * Handlers
   *
   */
  const handleClose = () => {
    setLocalStorage("provderTabIndex", "");
    navigate(encodeURI(`/${id}`));
  };

  /**
   *
   * Templates
   *
   */
  const tittleComponent = <Typography>Staff details</Typography>;

  const content = (header: string, value: string) => (
    <Grid item>
      <Grid container>
        <Grid className={classes.header} item>
          {header}
        </Grid>
        <Grid item>
          <Divider sx={{ marginRight: 1 }} orientation="vertical" />
        </Grid>
        <Grid item xs>
          {value}
        </Grid>
      </Grid>
    </Grid>
  );

  const mainContent = (
    <Grid container direction="column">
      {fetchStaffErrorMessage ? (
        <Grid item>
          <Alert severity="error">{fetchStaffErrorMessage}</Alert>
        </Grid>
      ) : null}
      {content("Full name", staff?.fullName || "")}
    </Grid>
  );

  return (
    <GDialogBox
      handleClose={handleClose}
      tittleComponent={tittleComponent}
      loading={isLoading}
      children={mainContent}
      maxWidth="sm"
    />
  );
};
