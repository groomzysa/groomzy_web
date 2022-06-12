import React, { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";

import { useFetchStaff } from "api/hooks/queries";
import { useDeleteStaff } from "api/hooks/mutations";
import { setLocalStorage } from "utils/localStorage";

import { GButton, GDialogBox, GTextField } from "components";

import { useStyles } from "./styles";

export const DeleteStaff: FC = () => {
  const { id, staffId } = useParams();
  const [deleteStaffSuccessMessage, setDeleteStaffSuccessMessage] =
    useState<string>();
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

  const {
    deleteStaffMutate,
    message,
    deleteStaffLoading,
    deleteStaffErrorMessage,
    deleteStaffHasError,
  } = useDeleteStaff({
    variables: {
      staffId: Number(staffId),
    },
  });

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    setDeleteStaffSuccessMessage(`${message}. You will be redirected shorlty.`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!deleteStaffSuccessMessage) return;

    setTimeout(() => {
      setDeleteStaffSuccessMessage(undefined);
      handleClose();
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteStaffSuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleDeleteStaff = async () => {
    deleteStaffMutate();
  };

  const handleClose = () => {
    setLocalStorage("provderTabIndex", "");
    navigate(encodeURI(`/${id}`));
  };

  /**
   *
   * Templates
   *
   */
  const tittleComponent = <Typography>Delete staff</Typography>;

  const mainContent = (
    <Grid container direction="column">
      {deleteStaffSuccessMessage ? (
        <Grid item>
          <Alert severity="success">{deleteStaffSuccessMessage}</Alert>
        </Grid>
      ) : null}
      {fetchStaffErrorMessage || deleteStaffHasError ? (
        <Alert severity="error">
          {fetchStaffErrorMessage || deleteStaffErrorMessage}
        </Alert>
      ) : null}
      <Grid className={classes.padTop10} item>
        <GTextField
          id="full-name"
          label="Full name"
          textValue={staff?.fullName || ""}
          disabled
        />
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
            disabled={deleteStaffLoading || !isEmpty(deleteStaffSuccessMessage)}
          />
        </Grid>
        <Grid item>
          <GButton
            children={"Delete"}
            className={classes.deleteButton}
            variant="outlined"
            onClick={handleDeleteStaff}
            loading={deleteStaffLoading}
            disabled={deleteStaffLoading || !isEmpty(deleteStaffSuccessMessage)}
          />
        </Grid>
      </Grid>
    </DialogActions>
  );

  return (
    <GDialogBox
      handleClose={handleClose}
      tittleComponent={tittleComponent}
      loading={isLoading}
      children={mainContent}
      footerComponent={footerComponent}
      maxWidth="sm"
    />
  );
};
