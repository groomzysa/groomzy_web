import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Grid } from "@mui/material";

import { useSignupClient, useSignupProvider } from "api/hooks/mutations";
import { SIGN_IN, SIGN_UP } from "utils/constants";

import { GButton, GCheckBox, GTextField } from "components";

import { useStyles } from "./styles";

export const SignupPage: FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signupSuccessMessage, setSignupSuccessMessage] = useState<string>("");
  const [isProvider, setIsProvider] = useState<boolean>(false);
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const {
    signupClientMutate,
    message: clientSignupSuccessMessage,
    signupClientLoading,
    signupClientErrorMessage,
    signupClientHasError,
  } = useSignupClient({
    variables: { email, password, fullName, phoneNumber },
  });

  const {
    signupProviderMutate,
    message: providerSignupSuccessMessage,
    signupProviderLoading,
    signupProviderErrorMessage,
    signupProviderHasError,
  } = useSignupProvider({
    variables: { email, password, fullName, phoneNumber },
  });

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!clientSignupSuccessMessage) return;
    setSignupSuccessMessage(clientSignupSuccessMessage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientSignupSuccessMessage]);

  useEffect(() => {
    if (!providerSignupSuccessMessage) return;
    setSignupSuccessMessage(providerSignupSuccessMessage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerSignupSuccessMessage]);

  useEffect(() => {
    if (!signupSuccessMessage) return;

    setTimeout(() => {
      navigate(`/${encodeURI(SIGN_IN.toLowerCase())}`, { replace: true });
    }, 10000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupSuccessMessage]);

  /**
   *
   * Handles
   *
   */
  const handleSignupClient = () => {
    signupClientMutate();
  };

  const handleSignupProvider = () => {
    signupProviderMutate();
  };

  const handleIsProvider = () => {
    setIsProvider(!isProvider);
  };

  const handleHaveAccountClick = () => {
    navigate(`/${encodeURI(SIGN_IN.toLowerCase())}`);
  };

  const isLoading = signupClientLoading || signupProviderLoading;

  return (
    <Grid className={classes.center} container>
      <Grid item xs={0} sm={2} md={3} lg={4}></Grid>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Grid container direction="column">
          <Grid item xs>
            {signupClientHasError || signupProviderHasError ? (
              <Alert severity="error">
                {signupClientErrorMessage || signupProviderErrorMessage}
              </Alert>
            ) : null}
          </Grid>
          <Grid item xs>
            {signupSuccessMessage ? (
              <Alert severity="success">{signupSuccessMessage}</Alert>
            ) : null}
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="fullName"
              label="Full name"
              type="text"
              setText={setFullName}
              textValue={fullName}
              disabled={isLoading}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="email"
              label="Email"
              type="email"
              setText={setEmail}
              textValue={email}
              disabled={isLoading}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="phoneNumber"
              label="Phone number"
              type="text"
              setText={setPhoneNumber}
              textValue={phoneNumber}
              disabled={isLoading}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="password"
              label="Password"
              type="password"
              setText={setPassword}
              textValue={password}
              disabled={isLoading}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GCheckBox
              checked={isProvider}
              onClick={handleIsProvider}
              label="Service provider ?"
            />
          </Grid>
          <Grid className={classes.padTop10} item>
            <GButton
              text={SIGN_UP}
              onClick={isProvider ? handleSignupProvider : handleSignupClient}
              loading={isLoading}
            />
          </Grid>
          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid className={classes.padTop10} item>
                <GButton
                  text="Have an account?"
                  onClick={handleHaveAccountClick}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} sm={2} md={3} lg={4}></Grid>
    </Grid>
  );
};
