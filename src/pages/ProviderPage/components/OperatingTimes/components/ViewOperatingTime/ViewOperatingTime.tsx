import React, { FC } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Alert, Divider, Grid, Typography } from "@mui/material";

import { useFetchOperatingTime } from "api/hooks/queries";

import { GDialogBox } from "components";

import { useStyles } from "./styles";

export const ViewOperatingTime: FC = () => {
  const { id, operatingTimeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { operatingTime, isLoading, fetchServiceErrorMessage } =
    useFetchOperatingTime({
      variables: { id: Number(operatingTimeId) },
    });

  /**
   *
   * Handlers
   *
   */
  const handleCreateTabIndexSearchParam = () => {
    return createSearchParams({
      tabIndex: searchParams.get("tabIndex")?.toString() || "1",
    }).toString();
  };

  const handleClose = () => {
    navigate({
      pathname: encodeURI(`/${id}`),
      search: handleCreateTabIndexSearchParam(),
    });
  };

  /**
   *
   * Templates
   *
   */
  const tittleComponent = <Typography>Operating time details</Typography>;

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
      {content("Day", operatingTime?.day?.day || "")}
      {content(
        "Start time",
        operatingTime?.time?.startTime
          ? operatingTime?.time.startTime + " hrz"
          : ""
      )}
      {content(
        "End time",
        operatingTime?.time?.endTime ? operatingTime?.time.endTime + " hrz" : ""
      )}
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
