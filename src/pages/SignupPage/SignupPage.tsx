import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Grid } from "@mui/material";
import { validate } from "email-validator";
import PhoneInput, {
  Value,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { useSignupClient, useSignupProvider } from "api/hooks/mutations";
import { SIGN_IN, SIGN_UP } from "utils/constants";

import { GButton, GCheckBox, GTextField } from "components";

import { useStyles } from "./styles";

export const SignupPage: FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [fullNameError, setFullNameError] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<Value>();
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
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
    variables: { email, password, fullName, phoneNumber: phoneNumber || "" },
  });

  const {
    signupProviderMutate,
    message: providerSignupSuccessMessage,
    signupProviderLoading,
    signupProviderErrorMessage,
    signupProviderHasError,
  } = useSignupProvider({
    variables: { email, password, fullName, phoneNumber: phoneNumber || "" },
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
    if (handleInputHasError()) return;
    signupClientMutate();
  };

  const handleSignupProvider = () => {
    if (handleInputHasError()) return;
    signupProviderMutate();
  };

  const handleIsProvider = () => {
    setIsProvider(!isProvider);
  };

  const handleHaveAccountClick = () => {
    navigate(`/${encodeURI(SIGN_IN.toLowerCase())}`);
  };

  const handleInputHasError = () => {
    let hasError = false;
    if (!fullName) {
      setFullNameError("Full name is required");
      hasError = true;
    }
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

    if (isProvider && !phoneNumber) {
      setPhoneNumberError("Phone number is required");
      hasError = true;
    } else if (isProvider && !isValidPhoneNumber(String(phoneNumber))) {
      setPhoneNumberError("Phone number is not valid");
      hasError = true;
    }

    return hasError;
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
              errorMessage={fullNameError}
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
          {isProvider && (
            <Grid className={classes.padTop10} item xs>
              <Grid container direction="column">
                <Grid item>
                  <PhoneInput
                    defaultCountry="ZA"
                    countries={["ZA"]}
                    countryCallingCodeEditable={false}
                    international
                    addInternationalOption={false}
                    placeholder="Enter phone number."
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                  />
                </Grid>
                {phoneNumberError && (
                  <Grid className={classes.phoneNumberInputError} item>
                    {phoneNumberError}
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
          <Grid className={classes.padTop10} item>
            <GButton
              children={SIGN_UP}
              onClick={isProvider ? handleSignupProvider : handleSignupClient}
              loading={isLoading}
              className={classes.button}
            />
          </Grid>
          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid className={classes.padTop10} item>
                <GButton
                  children="Have an account?"
                  onClick={handleHaveAccountClick}
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
