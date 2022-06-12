import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Divider, Grid, Typography } from "@mui/material";

import { useFetchService } from "api/hooks/queries";
import { setLocalStorage } from "utils/localStorage";
import { GDialogBox } from "components";

import { useStyles } from "./styles";

export const ViewService: FC = () => {
  const { id, serviceId } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { service, isLoading, fetchServiceErrorMessage } = useFetchService({
    variables: { id: Number(serviceId) },
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
  const tittleComponent = <Typography>Service details</Typography>;

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
      {fetchServiceErrorMessage ? (
        <Grid item>
          <Alert severity="error">{fetchServiceErrorMessage}</Alert>
        </Grid>
      ) : null}
      {content("Title", service?.title || "")}
      {content(
        "Category",
        service?.serviceProviderCategories?.[0]?.category?.category || ""
      )}
      {content("Price", service?.price ? "R" + service?.price : "")}
      {content(
        "Duration",
        `${service?.duration || ""} ${service?.durationUnit || ""}`
      )}
      {content("Desreption", service?.description || "")}
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
