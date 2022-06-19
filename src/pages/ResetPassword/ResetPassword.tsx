import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Grid } from "@mui/material";

import { useResetPassword } from "api/hooks/mutations";
import { RESET_PASSWORD, SIGN_IN } from "utils/constants";

import { GButton, GCheckBox, GTextField } from "components";

import { useStyles } from "./styles";

export const ResetPassword: FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isProvider, setIsProvider] = useState<boolean>(false);
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const {
    resetPasswordMutate,
    message,
    resetPasswordLoading,
    resetPasswordErrorMessage,
    resetPasswordHasError,
  } = useResetPassword();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;

    setTimeout(() => {
      navigate(`/${encodeURI(SIGN_IN.toLowerCase())}`, {
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
  const handleResetPassword = () => {
    if (handleInputHasError()) return;
    resetPasswordMutate({
      oneTimePin: otp,
      password,
      isProvider,
    });
  };

  const handleIsProvider = () => {
    setIsProvider(!isProvider);
  };

  const handleInputHasError = () => {
    let hasError = false;
    if (!otp) {
      setOtpError("OTP is required");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 5) {
      setPasswordError("Password should contain at least 5 characters");
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
            {resetPasswordHasError ? (
              <Alert severity="error">{resetPasswordErrorMessage}</Alert>
            ) : null}
          </Grid>
          <Grid item xs>
            {message ? (
              <Alert severity="success">{`${message} You will be redirected to sign in shortly.`}</Alert>
            ) : null}
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="otp"
              label="OTP"
              type="text"
              setText={setOtp}
              textValue={otp}
              disabled={resetPasswordLoading}
              errorMessage={otpError}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="password"
              label="Password"
              type="password"
              setText={setPassword}
              textValue={password}
              disabled={resetPasswordLoading}
              errorMessage={passwordError}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GCheckBox
              checked={isProvider}
              onClick={handleIsProvider}
              label="Service provider ?"
              disabled={resetPasswordLoading}
            />
          </Grid>
          <Grid className={classes.padTop10} item>
            <GButton
              children={RESET_PASSWORD}
              onClick={handleResetPassword}
              className={classes.button}
              loading={resetPasswordLoading}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} sm={2} md={3} lg={4}></Grid>
    </Grid>
  );
};
