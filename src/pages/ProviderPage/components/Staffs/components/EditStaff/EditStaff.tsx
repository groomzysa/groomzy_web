import React, { FC, useState, useEffect } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { Alert, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";

import { useFetchStaff } from "api/hooks/queries";
import { useEditStaff } from "api/hooks/mutations";

import { GButton, GDialogBox, GTextField } from "components";

import { useStyles } from "./styles";

export const EditStaff: FC = () => {
  const { id, staffId } = useParams();
  const [searchParams] = useSearchParams();
  const [fullName, setFullName] = useState<string>();
  const [editStaffSuccessMessage, setEditStaffSuccessMessage] =
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
    editStaffMutate,
    message,
    editStaffLoading,
    editStaffErrorMessage,
    editStaffHasError,
  } = useEditStaff();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    setEditStaffSuccessMessage(`${message}. You will be redirected shorlty.`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!editStaffSuccessMessage) return;

    setTimeout(() => {
      setEditStaffSuccessMessage(undefined);
      handleClose();
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editStaffSuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleEditStaff = async () => {
    editStaffMutate({
      staffId: Number(staffId),
      fullName,
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
  const tittleComponent = <Typography>Edit staff</Typography>;

  const mainContent = (
    <Grid container direction="column">
      {editStaffSuccessMessage ? (
        <Grid item>
          <Alert severity="success">{editStaffSuccessMessage}</Alert>
        </Grid>
      ) : null}
      {fetchStaffErrorMessage || editStaffHasError ? (
        <Alert severity="error">
          {fetchStaffErrorMessage || editStaffErrorMessage}
        </Alert>
      ) : null}
      <Grid className={classes.padTop10} item>
        <GTextField
          id="full-name"
          label="Full name"
          textValue={fullName ? fullName : staff?.fullName || ""}
          setText={setFullName}
          disabled={editStaffLoading || !isEmpty(editStaffSuccessMessage)}
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
            disabled={editStaffLoading || !isEmpty(editStaffSuccessMessage)}
          />
        </Grid>
        <Grid item>
          <GButton
            children={"Edit"}
            className={classes.editButton}
            variant="outlined"
            onClick={handleEditStaff}
            loading={editStaffLoading || !isEmpty(editStaffSuccessMessage)}
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
