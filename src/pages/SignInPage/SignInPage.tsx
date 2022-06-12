import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Grid } from "@mui/material";
import { validate } from "email-validator";

import { useSigninClient, useSigninProvider } from "api/hooks/mutations";
import { SIGN_IN, SIGN_UP } from "utils/constants";
import { setToken } from "utils/auth";
import { useApp } from "store";

import { GButton, GCheckBox, GTextField } from "components";

import { useStyles } from "./styles";

export const SignInPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isProvider, setIsProvider] = useState<boolean>(false);
  const [signingIn, setSigningIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const {
    signinClientMutate,
    client,
    signinClientLoading,
    signinClientErrorMessage,
    signinClienthasError,
  } = useSigninClient({
    variables: { email, password },
  });

  const {
    signinProviderMutate,
    provider,
    signinProviderLoading,
    signinProviderErrorMessage,
    signinProviderHasError,
  } = useSigninProvider({
    variables: { email, password },
  });

  const { setSignedInUser } = useApp();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!signingIn || signinClientLoading || signinClienthasError) return;
    setToken(client?.token || "");
    setSignedInUser(client);
    setSigningIn(false);
    navigate("/", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  useEffect(() => {
    if (!signingIn || signinProviderLoading || signinProviderHasError) return;
    setToken(provider?.token || "");
    setSignedInUser(provider);
    setSigningIn(false);
    navigate(`/${provider?.id}`, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  /**
   *
   * Handles
   *
   */
  const handleSigninClient = () => {
    if (handleInputHasError()) return;
    signinClientMutate();
    setSigningIn(true);
  };

  const handleSigninProvider = () => {
    if (handleInputHasError()) return;

    signinProviderMutate();
    setSigningIn(true);
  };

  const handleIsProvider = () => {
    setIsProvider(!isProvider);
  };

  const handleJoinClick = () => {
    navigate(`/${encodeURI(SIGN_UP.toLowerCase())}`);
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

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 5) {
      setPasswordError("Password should contain at least 5 characters");
      hasError = true;
    }

    return hasError;
  };

  const isLoading = signinClientLoading || signinProviderLoading;

  return (
    <Grid className={classes.center} container>
      <Grid item xs={0} sm={2} md={3} lg={4}></Grid>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Grid container direction="column">
          <Grid item xs>
            {signinClienthasError || signinProviderHasError ? (
              <Alert severity="error">
                {signinClientErrorMessage || signinProviderErrorMessage}
              </Alert>
            ) : null}
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="email"
              label="Email"
              type="email"
              setText={setEmail}
              textValue={email}
              disabled={isLoading}
              errorMessage={emailError}
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
              errorMessage={passwordError}
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
              children={SIGN_IN}
              onClick={isProvider ? handleSigninProvider : handleSigninClient}
              className={classes.button}
              loading={isLoading}
            />
          </Grid>
          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid className={classes.padTop10} item>
                <GButton
                  children="Forgot password"
                  className={classes.button}
                />
              </Grid>
              <Grid className={classes.padTop10} item>
                <GButton
                  children="Want to join?"
                  onClick={handleJoinClick}
                  className={classes.button}
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
