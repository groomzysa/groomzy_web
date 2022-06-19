import React, { FC, useState, useEffect } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Alert, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import TimePicker, { TimePickerValue } from "react-time-picker";

import { useEditOperatingTime } from "api/hooks/mutations";
import { useFetchOperatingTime } from "api/hooks/queries";
import { BUSINESS_DAYS } from "utils/constants";

import { GButton, GDialogBox, GSelect } from "components";
import { ISelectOption } from "store/types";

import { useStyles } from "./styles";

export const EditOperatingTime: FC = () => {
  const { id, operatingTimeId } = useParams();
  const [searchParams] = useSearchParams();
  const [day, setDay] = useState<ISelectOption>();
  const [startTime, setStartTime] = useState<TimePickerValue>("00:00");
  const [startTimeChanged, setStartTimeChanged] = useState<boolean>(false);
  const [endTime, setEndTime] = useState<TimePickerValue>("00:00");
  const [endTimeChanged, setEndTimeChanged] = useState<boolean>(false);
  const [editOperatingTimeSuccessMessage, setEditOperatingTimeSuccessMessage] =
    useState<string>();
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
    editOperatingTimeMutate,
    message,
    editOperatingTimeLoading,
    editOperatingTimeErrorMessage,
    editOperatingTimeHasError,
  } = useEditOperatingTime();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    setEditOperatingTimeSuccessMessage(
      `${message}. You will be redirected shorlty.`
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!editOperatingTimeSuccessMessage) return;

    setTimeout(() => {
      setEditOperatingTimeSuccessMessage(undefined);
      handleClose();
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editOperatingTimeSuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleEditOperatingTime = async () => {
    editOperatingTimeMutate({
      dayTimeId: Number(operatingTimeId),
      day: day?.value ? day?.value || "" : operatingTime?.day?.day || "",
      startTime: startTimeChanged ? (startTime as string) : undefined,
      endTime: endTimeChanged ? (endTime as string) : undefined,
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

  const handleStartTimeChange = (value: TimePickerValue) => {
    setStartTime(value);
    setStartTimeChanged(true);
  };

  const handleEndTimeChange = (value: TimePickerValue) => {
    setEndTime(value);
    setEndTimeChanged(true);
  };

  /**
   *
   * Templates
   *
   */
  const tittleComponent = <Typography>Edit operating time</Typography>;

  const mainContent = (
    <Grid container direction="column">
      {editOperatingTimeSuccessMessage ? (
        <Grid item>
          <Alert severity="success">{editOperatingTimeSuccessMessage}</Alert>
        </Grid>
      ) : null}
      {fetchServiceErrorMessage || editOperatingTimeHasError ? (
        <Alert severity="error">
          {fetchServiceErrorMessage || editOperatingTimeErrorMessage}
        </Alert>
      ) : null}
      <Grid
        className={editOperatingTimeSuccessMessage ? classes.padTop10 : ""}
        item
      >
        <GSelect
          id="day"
          options={BUSINESS_DAYS}
          selectLabel="Day"
          setSelect={setDay}
          value={
            day
              ? day
              : BUSINESS_DAYS.find(
                  ({ value }) => value === operatingTime?.day.day
                )
          }
          disabled={editOperatingTimeLoading}
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
              value={
                startTimeChanged
                  ? startTime
                  : (operatingTime?.time.startTime as TimePickerValue)
              }
              onChange={handleStartTimeChange}
              format="HH:mm"
              hourPlaceholder="hh"
              minutePlaceholder="mm"
              disabled={editOperatingTimeLoading}
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
              value={
                endTimeChanged
                  ? endTime
                  : (operatingTime?.time.endTime as TimePickerValue)
              }
              onChange={handleEndTimeChange}
              format="HH:mm"
              hourPlaceholder="hh"
              minutePlaceholder="mm"
              disabled={editOperatingTimeLoading}
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
              editOperatingTimeLoading ||
              !isEmpty(editOperatingTimeSuccessMessage)
            }
          />
        </Grid>
        <Grid item>
          <GButton
            children={"Edit"}
            className={classes.addButton}
            variant="outlined"
            onClick={handleEditOperatingTime}
            disabled={
              editOperatingTimeLoading ||
              !isEmpty(editOperatingTimeSuccessMessage)
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
