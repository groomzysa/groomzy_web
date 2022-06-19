import React, { FC, useState, useEffect } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Alert, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";

import { useFetchStaff } from "api/hooks/queries";
import { useDeleteStaff } from "api/hooks/mutations";

import { GButton, GDialogBox, GTextField } from "components";

import { useStyles } from "./styles";

export const DeleteStaff: FC = () => {
  const { id, staffId } = useParams();
  const [searchParams] = useSearchParams();
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
  } = useDeleteStaff();

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
    deleteStaffMutate({
      staffId: Number(staffId),
    });
  };

  const handleCreateTabIndexSearchParam = () => {
    return createSearchParams({
      tabIndex: searchParams.get("tabIndex")?.toString() || "2",
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
