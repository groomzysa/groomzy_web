import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Grid } from "@mui/material";
import clsx from "clsx";

import { useEditProfile } from "api/hooks/mutations";
import { EDIT_PROFILE, PROVINCES } from "utils/constants";

import { GButton, GSelect, GTextField } from "components";
import { ISelectOption } from "store/types";

import { useStyles } from "./styles";

export const EditProfilePage: FC = () => {
  const [fullName, setFullName] = useState<string>();
  const [streetNumber, setStreetNumber] = useState<string>();
  const [streetName, setStreetName] = useState<string>();
  const [suburbName, setSuburbName] = useState<string>();
  const [cityName, setCityName] = useState<string>();
  const [provinceName, setProvinceName] = useState<ISelectOption>();
  const [areaCode, setAreaCode] = useState<string>();
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  const [editProfileSuccessMessage, setEditProfileSuccessMessage] =
    useState<string>();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const {
    editProfileMutate,
    message,
    editProfileLoading: isLoading,
    editProfileHasError,
    editProfileErrorMessage,
  } = useEditProfile({
    variables: {
      fullName,
      streetNumber,
      streetName,
      suburbName,
      cityName,
      provinceName: provinceName?.value,
      areaCode,
      latitude,
      longitude,
    },
  });

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    setEditProfileSuccessMessage(message);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!editProfileSuccessMessage) return;

    setTimeout(() => {
      setEditProfileSuccessMessage(undefined);
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editProfileSuccessMessage]);

  /**
   *
   * Handles
   *
   */
  const handleEditProfile = () => {
    editProfileMutate();
  };

  return (
    <Grid className={classes.center} container>
      <Grid item xs={0} sm={0} md={2} lg={3}></Grid>
      <Grid item xs={12} sm={12} md={8} lg={6}>
        <Grid container direction="column">
          <Grid item xs>
            {editProfileHasError ? (
              <Alert severity="error">{editProfileErrorMessage}</Alert>
            ) : null}
          </Grid>
          <Grid item xs>
            {editProfileSuccessMessage ? (
              <Alert severity="success">{editProfileSuccessMessage}</Alert>
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

          <Grid item className={clsx(classes.padTop10, classes.widthMin)}>
            <Grid container>
              <Grid item className={classes.streetNumber} flexGrow="inherit">
                <GTextField
                  id="streetNumber"
                  label="Street number"
                  type="text"
                  setText={setStreetNumber}
                  textValue={streetNumber}
                  disabled={isLoading}
                />
              </Grid>
              <Grid item xs>
                <GTextField
                  id="streetName"
                  label="Street name"
                  type="text"
                  setText={setStreetName}
                  textValue={streetName}
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="suburbName"
              label="Suburb name"
              type="text"
              setText={setSuburbName}
              textValue={suburbName}
              disabled={isLoading}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="cityName"
              label="City name"
              type="text"
              setText={setCityName}
              textValue={cityName}
              disabled={isLoading}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GSelect
              id="provinces"
              options={PROVINCES}
              selectLabel="Province"
              setSelect={setProvinceName}
              value={provinceName}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="areaCode"
              label="Area code"
              type="text"
              setText={setAreaCode}
              textValue={areaCode}
              disabled={isLoading}
            />
          </Grid>
          <Grid className={classes.padTop10} item>
            <GButton
              text={EDIT_PROFILE}
              onClick={handleEditProfile}
              loading={isLoading}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} sm={0} md={2} lg={3}></Grid>
    </Grid>
  );
};
