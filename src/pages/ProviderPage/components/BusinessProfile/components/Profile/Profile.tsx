import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Avatar, Button, Grid } from "@mui/material";
import { isEmpty } from "lodash";
import clsx from "clsx";

import { useFetchProviderProfile } from "api/hooks/queries";
import { useAddProviderProfile } from "api/hooks/mutations";
import { geocode } from "utils/googleServices";
import { SAVE, PROVINCES } from "utils/constants";

import {
  GButton,
  GImageCrop,
  GLoadingSpinner,
  GSelect,
  GTextField,
} from "components";
import { ISelectOption } from "store/types";

import { useStyles } from "./styles";

export const Profile: FC = () => {
  const { id } = useParams();
  const [tradingName, setTradingName] = useState<string>("");
  const [tradingStreetNumber, setTradingStreetNumber] = useState<string>("");
  const [tradingStreetName, setTradingStreetName] = useState<string>("");
  const [tradingSuburbName, setTradingSuburbName] = useState<string>("");
  const [tradingCityName, setTradingCityName] = useState<string>("");
  const [tradingProvinceName, setTradingProvinceName] =
    useState<ISelectOption>();
  const [tradingAreaCode, setTradingAreaCode] = useState<string>("");
  const [tradingLatitude, setTradingLatitude] = useState<number>();
  const [tradingLongitude, setTradingLongitude] = useState<number>();
  const [tradingProfileImage, setTrandingProfileImage] = useState<File>();
  const [trandingViewImage, setTradingViewImage] = useState<string>();
  const [rawTradingImage, setRawTradingImage] = useState<File>();
  const [
    addProviderProfileSuccessMessage,
    setAddProviderProfileSuccessMessage,
  ] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { providerProfile, isLoading } = useFetchProviderProfile({
    variables: { providerId: Number(id) },
  });

  const {
    addProviderProfileMutate,
    message,
    addProviderProfileLoading,
    addProviderProfileHasError,
    addProviderProfileErrorMessage,
  } = useAddProviderProfile();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    let successMessage = message;
    if (tradingProfileImage) {
      successMessage = `${message}. Please, give us an hour to update profile image.`;
    }
    setAddProviderProfileSuccessMessage(successMessage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!addProviderProfileSuccessMessage) return;

    setTimeout(() => {
      setTrandingProfileImage(undefined);
      setTradingViewImage(undefined);
      setRawTradingImage(undefined);
      setErrorMessage(undefined);
      setAddProviderProfileSuccessMessage(undefined);
    }, 8000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addProviderProfileSuccessMessage]);

  /**
   *
   * Handlers
   *
   */

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event?.target?.files?.[0];
    if (!selectedImage) return;
    const imageReader = new FileReader();
    imageReader.readAsDataURL(selectedImage);
    imageReader.onloadend = () => {
      setTradingViewImage(imageReader.result as string);
    };
    setRawTradingImage(selectedImage);
  };

  const computeAddress = (address: string, appendValue: string) => {
    return isEmpty(address) ? appendValue : `${address}, ${appendValue}`;
  };

  const handleGetLatLng = async () => {
    let address: string = "";
    const canGetLatLng =
      tradingStreetNumber ||
      tradingStreetName ||
      tradingSuburbName ||
      tradingCityName ||
      tradingProvinceName ||
      tradingAreaCode;
    if (canGetLatLng) {
      if (tradingStreetNumber) {
        address = computeAddress(address, tradingStreetNumber);
      }
      if (tradingStreetName) {
        address = computeAddress(address, tradingStreetName);
      }
      if (tradingSuburbName) {
        address = computeAddress(address, tradingSuburbName);
      }
      if (tradingCityName) {
        address = computeAddress(address, tradingCityName);
      }
      if (tradingProvinceName) {
        address = computeAddress(address, tradingProvinceName.value);
      }
      if (tradingAreaCode) {
        address = computeAddress(address, tradingAreaCode);
      }

      const latLng = await geocode.fromAddress(address);

      if (latLng.status === "OK") {
        const { lat, lng } = latLng.results[0].geometry.location;
        setTradingLatitude(lat);
        setTradingLongitude(lng);
      }
    }

    return true;
  };

  const handleAddProviderProfile = async () => {
    const proceed = await handleGetLatLng();
    if (proceed) {
      addProviderProfileMutate({
        tradingName: tradingName || providerProfile?.tradingName || "",
        tradingStreetName:
          tradingStreetName || providerProfile?.tradingStreetName || "",
        tradingStreetNumber:
          tradingStreetNumber || providerProfile?.tradingStreetNumber || "",
        tradingSuburbName:
          tradingSuburbName || providerProfile?.tradingSuburbName || "",
        tradingCityName:
          tradingCityName || providerProfile?.tradingCityName || "",
        tradingProvinceName:
          tradingProvinceName?.value ||
          providerProfile?.tradingProvinceName ||
          "",
        tradingAreaCode:
          tradingAreaCode || providerProfile?.tradingAreaCode || "",
        tradingLatitude,
        tradingLongitude,
        tradingProfileImage,
      });
    }
  };

  /**
   *
   * Templates
   *
   */
  const profileImageInput = (
    <>
      <Grid container alignItems="center">
        <Grid item className={classes.padRight10}>
          <Avatar
            key={`${new Date()}`}
            alt={"Trading profile image"}
            src={
              trandingViewImage || providerProfile?.tradingProfileImageUrl || ""
            }
            className={classes.avatar}
          />
        </Grid>
        <Grid className={classes.imgName} item>
          {rawTradingImage?.name
            ? rawTradingImage?.name
            : "New trading profile image"}
        </Grid>
      </Grid>
      <input
        type="file"
        name="profileImage"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileSelected}
        hidden
      />
    </>
  );

  if (isLoading) {
    return <GLoadingSpinner />;
  }

  return (
    <Grid className={classes.center} container>
      <Grid item xs={0} sm={0} md={2} lg={3}></Grid>
      <Grid item xs={12} sm={12} md={8} lg={6}>
        <Grid container direction="column" className={classes.marginBottom20}>
          {isEmpty(providerProfile || {}) && (
            <Grid className={classes.padTop10} item xs>
              <Alert severity="warning">You have not set your profile</Alert>
            </Grid>
          )}
          <Grid className={classes.padTop10} item xs>
            {addProviderProfileHasError || errorMessage ? (
              <Alert severity="error">
                {addProviderProfileErrorMessage || errorMessage}
              </Alert>
            ) : null}
          </Grid>
          <Grid item xs>
            {addProviderProfileSuccessMessage ? (
              <Alert severity="success">
                {addProviderProfileSuccessMessage}
              </Alert>
            ) : null}
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="tradingName"
              label="Trading name"
              type="text"
              setText={setTradingName}
              textValue={tradingName || providerProfile?.tradingName || ""}
              disabled={addProviderProfileLoading}
            />
          </Grid>
          <Grid className={clsx(classes.padTop10, classes.newImage)} item xs>
            <Grid container direction="column">
              <Grid item>
                <Button
                  variant="text"
                  component="label"
                  color="primary"
                  disableRipple
                >
                  {profileImageInput}
                </Button>
              </Grid>
              <Grid
                item
                className={rawTradingImage ? classes.imageContainer : ""}
              >
                <GImageCrop
                  className={rawTradingImage ? classes.imageContainer : ""}
                  circularCrop
                  maxHeightCrop={200}
                  maxWidthCrop={200}
                  imageName={`trading_profile_${id}.${
                    rawTradingImage?.type?.split("/")?.[1]
                  }`}
                  rawImage={rawTradingImage}
                  setErrorMessage={setErrorMessage}
                  setFinalImage={setTrandingProfileImage}
                  viewImage={trandingViewImage}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.widthMin}>
            <Grid container>
              <Grid item className={classes.streetNumber} flexGrow="inherit">
                <GTextField
                  id="tradingStreetNumber"
                  label="Trading street number"
                  type="text"
                  setText={setTradingStreetNumber}
                  textValue={
                    tradingStreetNumber ||
                    providerProfile?.tradingStreetNumber ||
                    ""
                  }
                  disabled={addProviderProfileLoading}
                />
              </Grid>
              <Grid item xs>
                <GTextField
                  id="tradingStreetName"
                  label="Trading street name"
                  type="text"
                  setText={setTradingStreetName}
                  textValue={
                    tradingStreetName ||
                    providerProfile?.tradingStreetName ||
                    ""
                  }
                  disabled={addProviderProfileLoading}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="tradingSuburbName"
              label="Trading suburb name"
              type="text"
              setText={setTradingSuburbName}
              textValue={
                tradingSuburbName || providerProfile?.tradingSuburbName || ""
              }
              disabled={addProviderProfileLoading}
            />
          </Grid>
          <Grid item className={clsx(classes.padTop10, classes.widthMin)}>
            <Grid container>
              <Grid item className={classes.province} flexGrow="inherit">
                <GSelect
                  id="tradingProvinces"
                  options={PROVINCES}
                  selectLabel="Trading province"
                  setSelect={setTradingProvinceName}
                  value={
                    tradingProvinceName ||
                    PROVINCES.find(
                      ({ value }) =>
                        value === providerProfile?.tradingProvinceName
                    )
                  }
                  disabled={addProviderProfileLoading}
                />
              </Grid>
              <Grid item xs>
                <GTextField
                  id="tradingCityName"
                  label="Trading city name"
                  type="text"
                  setText={setTradingCityName}
                  textValue={
                    tradingCityName || providerProfile?.tradingCityName || ""
                  }
                  disabled={addProviderProfileLoading}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="tradingAreaCode"
              label="Trading area code"
              type="text"
              setText={setTradingAreaCode}
              textValue={
                tradingAreaCode || providerProfile?.tradingAreaCode || ""
              }
              disabled={addProviderProfileLoading}
            />
          </Grid>
          <Grid className={classes.padTop10} item>
            <GButton
              children={SAVE}
              onClick={handleAddProviderProfile}
              className={classes.button}
              loading={addProviderProfileLoading}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} sm={0} md={2} lg={3}></Grid>
    </Grid>
  );
};
