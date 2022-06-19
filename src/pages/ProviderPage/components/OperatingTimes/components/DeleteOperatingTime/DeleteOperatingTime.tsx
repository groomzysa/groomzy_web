import React, { FC, useState, useEffect } from "react";
import {
  useNavigate,
  useParams,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { Alert, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import TimePicker, { TimePickerValue } from "react-time-picker";

import { useDeleteOperatingTime } from "api/hooks/mutations";
import { useFetchOperatingTime } from "api/hooks/queries";
import { BUSINESS_DAYS } from "utils/constants";

import { GButton, GDialogBox, GSelect } from "components";

import { useStyles } from "./styles";

export const DeleteOperatingTime: FC = () => {
  const { id, operatingTimeId } = useParams();
  const [searchParams] = useSearchParams();
  const [
    deleteOperatingTimeSuccessMessage,
    setDeleteOperatingTimeSuccessMessage,
  ] = useState<string>();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { operatingTime, isLoading, fetchServiceErrorMessage } =
    useFetchOperatingTime({ variables: { id: Number(operatingTimeId) } });

  const {
    deleteOperatingTimeMutate,
    message,
    deleteOperatingTimeLoading,
    deleteOperatingTimeErrorMessage,
    deleteOperatingTimeHasError,
  } = useDeleteOperatingTime();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    setDeleteOperatingTimeSuccessMessage(
      `${message}. You will be redirected shorlty.`
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!deleteOperatingTimeSuccessMessage) return;

    setTimeout(() => {
      setDeleteOperatingTimeSuccessMessage(undefined);
      handleClose();
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteOperatingTimeSuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleDeleteOperatingTime = async () => {
    deleteOperatingTimeMutate({
      dayTimeId: Number(operatingTimeId),
    });
  };

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
  const tittleComponent = <Typography>Delete operating time</Typography>;

  const mainContent = (
    <Grid container direction="column">
      {deleteOperatingTimeSuccessMessage ? (
        <Grid item>
          <Alert severity="success">{deleteOperatingTimeSuccessMessage}</Alert>
        </Grid>
      ) : null}
      {fetchServiceErrorMessage || deleteOperatingTimeHasError ? (
        <Alert severity="error">
          {fetchServiceErrorMessage || deleteOperatingTimeErrorMessage}
        </Alert>
      ) : null}
      <Grid
        className={deleteOperatingTimeSuccessMessage ? classes.padTop10 : ""}
        item
      >
        <GSelect
          id="day"
          options={BUSINESS_DAYS}
          selectLabel="Day"
          setSelect={() => {}}
          value={BUSINESS_DAYS.find(
            ({ value }) => value === operatingTime?.day.day
          )}
          disabled
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <Grid container>
          <Grid className={classes.padRight10} item>
            <Typography className={classes.timeInputLabel}>
              Start time (24 hrz clock)
            </Typography>
          </Grid>
          <Grid item>
            <TimePicker
              name="Start time"
              value={operatingTime?.time.startTime as TimePickerValue}
              format="HH:mm"
              hourPlaceholder="hh"
              minutePlaceholder="mm"
              disabled
              disableClock
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.padTop10} item>
        <Grid container>
          <Grid className={classes.padRight10} item>
            <Typography className={classes.timeInputLabel}>
              End time (24 hrz clock)
            </Typography>
          </Grid>
          <Grid item>
            <TimePicker
              name="End time"
              value={operatingTime?.time.endTime as TimePickerValue}
              format="HH:mm"
              hourPlaceholder="hh"
              minutePlaceholder="mm"
              disabled
              disableClock
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const footerComponent = (
    <DialogActions>
      <Grid container>
        <Grid className={classes.padRight10} item>
          <GButton
            children={"Cancel"}
            className={classes.cancelButton}
            variant="outlined"
            onClick={handleClose}
            disabled={
              deleteOperatingTimeLoading ||
              !isEmpty(deleteOperatingTimeSuccessMessage)
            }
          />
        </Grid>
        <Grid item>
          <GButton
            children={"Delete"}
            className={classes.addButton}
            variant="outlined"
            onClick={handleDeleteOperatingTime}
            disabled={
              deleteOperatingTimeLoading ||
              !isEmpty(deleteOperatingTimeSuccessMessage)
            }
          />
        </Grid>
      </Grid>
    </DialogActions>
  );

  return (
    <GDialogBox
      handleClose={handleClose}
      tittleComponent={tittleComponent}
      children={mainContent}
      loading={isLoading}
      footerComponent={footerComponent}
      maxWidth="sm"
    />
  );
};
