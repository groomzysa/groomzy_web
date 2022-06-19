import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Grid } from "@mui/material";
import { validate } from "email-validator";

import { useRequestResetPassword } from "api/hooks/mutations";
import { REQUEST_RESET_PASSWORD, RESET_PASSWORD } from "utils/constants";

import { GButton, GCheckBox, GTextField } from "components";

import { useStyles } from "./styles";

export const RequestResetPassword: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isProvider, setIsProvider] = useState<boolean>(false);
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const {
    requestResetPasswordMutate,
    message,
    requestResetPasswordLoading,
    requestResetPasswordErrorMessage,
    requestResetPasswordHasError,
  } = useRequestResetPassword();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;

    setTimeout(() => {
      navigate(`/${encodeURI(RESET_PASSWORD.toLowerCase())}`, {
        replace: true,
      });
    }, 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  /**
   *
   * Handles
   *
   */
  const handleRequestResetPassword = () => {
    if (handleInputHasError()) return;
    requestResetPasswordMutate({
      email,
      isProvider,
    });
  };

  const handleIsProvider = () => {
    setIsProvider(!isProvider);
  };

  const handleInputHasError = () => {
    let hasError = false;
    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!validate(email)) {
      setEmailError("Email is not valid");
      hasError = true;
    }

    return hasError;
  };

  return (
    <Grid className={classes.center} container>
      <Grid item xs={0} sm={2} md={3} lg={4}></Grid>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Grid container direction="column">
          <Grid item xs>
            {requestResetPasswordHasError ? (
              <Alert severity="error">{requestResetPasswordErrorMessage}</Alert>
            ) : null}
          </Grid>
          <Grid item xs>
            {message ? (
              <Alert severity="success">{`${message} You will be redirected to change password shortly.`}</Alert>
            ) : null}
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="email"
              label="Email"
              type="email"
              setText={setEmail}
              textValue={email}
              disabled={requestResetPasswordLoading}
              errorMessage={emailError}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GCheckBox
              checked={isProvider}
              onClick={handleIsProvider}
              label="Service provider ?"
              disabled={requestResetPasswordLoading}
            />
          </Grid>
          <Grid className={classes.padTop10} item>
            <GButton
              children={REQUEST_RESET_PASSWORD}
              onClick={handleRequestResetPassword}
              className={classes.button}
              loading={requestResetPasswordLoading}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} sm={2} md={3} lg={4}></Grid>
    </Grid>
  );
};
