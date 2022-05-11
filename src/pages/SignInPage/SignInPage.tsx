import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Grid } from "@mui/material";

import { useSigninClient, useSigninProvider } from "api/hooks/mutations";
import { SIGN_IN } from "utils/constants";
import { useApp } from "store";
import { GButton, GCheckBox, GLoadingSpinner, GTextField } from "components";
import { useStyles } from "./styles";
import { setToken } from "utils/auth";

export const SignInPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
    navigate("/", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  /**
   *
   * Handles
   *
   */
  const handleSigninClient = () => {
    signinClientMutate();
    setSigningIn(true);
  };

  const handleSigninProvider = () => {
    signinProviderMutate();
    setSigningIn(true);
  };

  const handleIsProvider = () => {
    setIsProvider(!isProvider);
  };

  return signinClientLoading || signinProviderLoading ? (
    <GLoadingSpinner />
  ) : (
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
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="password"
              label="Password"
              type="password"
              setText={setPassword}
              textValue={password}
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
              text={SIGN_IN}
              onClick={isProvider ? handleSigninProvider : handleSigninClient}
            />
          </Grid>
          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid className={classes.padTop10} item>
                <GButton text="Forgot password" />
              </Grid>
              <Grid className={classes.padTop10} item>
                <GButton text="Want to join?" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} sm={2} md={3} lg={4}></Grid>
    </Grid>
  );
};
