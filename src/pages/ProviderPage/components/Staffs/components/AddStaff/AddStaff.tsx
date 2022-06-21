import React, { FC, useState, useEffect } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Alert, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";

import { useAddStaff } from "api/hooks/mutations";

import { GButton, GDialogBox, GTextField } from "components";

import { useStyles } from "./styles";

export const AddStaff: FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [fullName, setFullName] = useState<string>("");
  const [fullNameError, setFullNameError] = useState<string>("");
  const [addStaffSuccessMessage, setAddStaffSuccessMessage] =
    useState<string>();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const {
    addStaffMutate,
    message,
    addStaffLoading,
    addStaffErrorMessage,
    addStaffHasError,
  } = useAddStaff();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    setAddStaffSuccessMessage(`${message}. You will be redirected shorlty.`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!addStaffSuccessMessage) return;

    setTimeout(() => {
      setAddStaffSuccessMessage(undefined);
      handleClose();
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addStaffSuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleAddStaff = async () => {
    if (handleInputHasError()) return;
    addStaffMutate({ fullName });
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

  const handleInputHasError = () => {
    let hasError = false;
    if (!fullName) {
      setFullNameError("Full name is required");
      hasError = true;
    }
    return hasError;
  };

  /**
   *
   * Templates
   *
   */
  const tittleComponent = <Typography>Add staff</Typography>;

  const mainContent = (
    <Grid container direction="column">
      {addStaffSuccessMessage ? (
        <Grid item>
          <Alert severity="success">{addStaffSuccessMessage}</Alert>
        </Grid>
      ) : null}
      {addStaffHasError ? (
        <Grid item>
          <Alert severity="error">{addStaffErrorMessage}</Alert>
        </Grid>
      ) : null}

      <Grid className={classes.padTop10} item>
        <GTextField
          id="full-name"
          label="Full name"
          textValue={fullName}
          setText={setFullName}
          disabled={addStaffLoading}
          errorMessage={fullNameError}
          resetErrorMessage={setFullNameError}
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
            disabled={addStaffLoading || !isEmpty(addStaffSuccessMessage)}
          />
        </Grid>
        <Grid item>
          <GButton
            children={"Add"}
            className={classes.addButton}
            variant="outlined"
            onClick={handleAddStaff}
            disabled={addStaffLoading || !isEmpty(addStaffSuccessMessage)}
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
