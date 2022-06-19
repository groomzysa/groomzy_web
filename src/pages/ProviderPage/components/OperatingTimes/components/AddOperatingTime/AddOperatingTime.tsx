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

import { useAddOperatingTime } from "api/hooks/mutations";
import { BUSINESS_DAYS } from "utils/constants";

import { GButton, GDialogBox, GSelect } from "components";
import { ISelectOption } from "store/types";

import { useStyles } from "./styles";

export const AddOperatingTime: FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [day, setDay] = useState<ISelectOption>();
  const [startTime, setStartTime] = useState<TimePickerValue>("08:00");
  const [endTime, setEndTime] = useState<TimePickerValue>("17:00");
  const [addOperatingTimeSuccessMessage, setAddOperatingTimeSuccessMessage] =
    useState<string>();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const {
    addOperatingTimeMutate,
    message,
    addOperatingTimeLoading,
    addOperatingTimeErrorMessage,
    addOperatingTimeHasError,
  } = useAddOperatingTime();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    setAddOperatingTimeSuccessMessage(
      `${message}. You will be redirected shorlty.`
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!addOperatingTimeSuccessMessage) return;

    setTimeout(() => {
      setAddOperatingTimeSuccessMessage(undefined);
      handleClose();
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addOperatingTimeSuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleAddOperatingTime = async () => {
    if (!day || !startTime || !endTime) return;
    addOperatingTimeMutate({
      day: day?.value || "",
      startTime: startTime as string,
      endTime: endTime as string,
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
  const tittleComponent = <Typography>Add operating time</Typography>;

  const mainContent = (
    <Grid container direction="column">
      {addOperatingTimeSuccessMessage ? (
        <Grid item>
          <Alert severity="success">{addOperatingTimeSuccessMessage}</Alert>
        </Grid>
      ) : null}
      {addOperatingTimeHasError ? (
        <Alert severity="error">{addOperatingTimeErrorMessage}</Alert>
      ) : null}
      <Grid
        className={addOperatingTimeSuccessMessage ? classes.padTop10 : ""}
        item
      >
        <GSelect
          id="day"
          options={BUSINESS_DAYS}
          selectLabel="Day"
          setSelect={setDay}
          value={day}
          disabled={addOperatingTimeLoading}
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
              value={startTime}
              onChange={setStartTime}
              format="HH:mm"
              hourPlaceholder="hh"
              minutePlaceholder="mm"
              disabled={addOperatingTimeLoading}
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
              value={endTime}
              onChange={setEndTime}
              format="HH:mm"
              hourPlaceholder="hh"
              minutePlaceholder="mm"
              disabled={addOperatingTimeLoading}
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
              addOperatingTimeLoading ||
              !isEmpty(addOperatingTimeSuccessMessage)
            }
          />
        </Grid>
        <Grid item>
          <GButton
            children={"Add"}
            className={classes.addButton}
            variant="outlined"
            onClick={handleAddOperatingTime}
            disabled={
              addOperatingTimeLoading ||
              !isEmpty(addOperatingTimeSuccessMessage)
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
      footerComponent={footerComponent}
      maxWidth="sm"
    />
  );
};
