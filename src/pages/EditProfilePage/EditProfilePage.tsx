import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Alert, Avatar, Button, Grid } from "@mui/material";
import { isEmpty } from "lodash";
import clsx from "clsx";

import { useEditProfile } from "api/hooks/mutations";
import { PROVINCES, SAVE } from "utils/constants";
import { geocode } from "utils/googleServices";

import { GButton, GImageCrop, GSelect, GTextField } from "components";
import { ISelectOption } from "store/types";
import { useApp } from "store";

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
  const [profileImage, setProfileImage] = useState<File>();
  const [viewImage, setViewImage] = useState<string>();
  const [rawImage, setRawImage] = useState<File>();
  const [editProfileSuccessMessage, setEditProfileSuccessMessage] =
    useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { signedInUser } = useApp();
  const { address } = signedInUser || {};

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
      profileImage,
    },
  });

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    let successMessage = message;
    if (profileImage) {
      successMessage = `${message}. Please, give us an hour to update profile image.`;
    }
    setEditProfileSuccessMessage(successMessage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!editProfileSuccessMessage) return;

    setTimeout(() => {
      setProfileImage(undefined);
      setViewImage(undefined);
      setRawImage(undefined);
      setErrorMessage(undefined);
      setEditProfileSuccessMessage(undefined);
    }, 8000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editProfileSuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleEditProfile = async () => {
    const proceed = await handleGetLatLng();
    if (proceed) {
      editProfileMutate();
    }
  };

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event?.target?.files?.[0];
    if (!selectedImage) return;
    const imageReader = new FileReader();
    imageReader.readAsDataURL(selectedImage);
    imageReader.onloadend = () => {
      setViewImage(imageReader.result as string);
    };
    setRawImage(selectedImage);
  };

  const computeAddress = (address: string, appendValue: string) => {
    return isEmpty(address) ? appendValue : `${address}, ${appendValue}`;
  };

  const handleGetLatLng = async () => {
    let address: string = "";
    const canGetLatLng =
      streetNumber ||
      streetName ||
      suburbName ||
      cityName ||
      provinceName ||
      areaCode;
    if (canGetLatLng) {
      if (streetNumber) {
        address = computeAddress(address, streetNumber);
      }
      if (streetName) {
        address = computeAddress(address, streetName);
      }
      if (suburbName) {
        address = computeAddress(address, suburbName);
      }
      if (cityName) {
        address = computeAddress(address, cityName);
      }
      if (provinceName) {
        address = computeAddress(address, provinceName.value);
      }
      if (areaCode) {
        address = computeAddress(address, areaCode);
      }

      const latLng = await geocode.fromAddress(address);

      if (latLng.status === "OK") {
        const { lat, lng } = latLng.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
      }
    }

    return true;
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
            alt={signedInUser?.fullName || "Profile placeholder"}
            src={
              viewImage ? viewImage : (signedInUser?.profileImageUrl as string)
            }
            className={classes.avatar}
          />
        </Grid>
        <Grid className={classes.imgName} item>
          {rawImage?.name ? rawImage?.name : "New image"}
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

  return (
    <Grid className={classes.center} container>
      <Grid item xs={0} sm={0} md={2} lg={3}></Grid>
      <Grid item xs={12} sm={12} md={8} lg={6}>
        <Grid container direction="column">
          <Grid item xs>
            {editProfileHasError || errorMessage ? (
              <Alert severity="error">
                {editProfileErrorMessage || errorMessage}
              </Alert>
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
              textValue={fullName ? fullName : signedInUser?.fullName || ""}
              disabled={isLoading}
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
              <Grid item className={rawImage ? classes.imageContainer : ""}>
                <GImageCrop
                  className={rawImage ? classes.imageContainer : ""}
                  circularCrop
                  maxHeightCrop={200}
                  maxWidthCrop={200}
                  imageName={`${signedInUser?.email}_${
                    signedInUser?.id
                  }provider_profile.${rawImage?.type?.split("/")?.[1]}`}
                  rawImage={rawImage}
                  setErrorMessage={setErrorMessage}
                  setFinalImage={setProfileImage}
                  viewImage={viewImage}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={clsx(classes.padTop10, classes.widthMin)}>
            <Grid container>
              <Grid item className={classes.streetNumber} flexGrow="inherit">
                <GTextField
                  id="streetNumber"
                  label="Street number"
                  type="text"
                  setText={setStreetNumber}
                  textValue={
                    streetNumber ? streetNumber : address?.streetNumber || ""
                  }
                  disabled={isLoading}
                />
              </Grid>
              <Grid item xs>
                <GTextField
                  id="streetName"
                  label="Street name"
                  type="text"
                  setText={setStreetName}
                  textValue={
                    streetName ? streetName : address?.streetName || ""
                  }
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
              textValue={suburbName ? suburbName : address?.suburbName || ""}
              disabled={isLoading}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="cityName"
              label="City name"
              type="text"
              setText={setCityName}
              textValue={cityName ? cityName : address?.cityName || ""}
              disabled={isLoading}
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GSelect
              id="provinces"
              options={PROVINCES}
              selectLabel="Province"
              setSelect={setProvinceName}
              value={
                provinceName
                  ? provinceName
                  : PROVINCES.find(
                      (province) => province.value === address?.provinceName
                    )
              }
            />
          </Grid>
          <Grid className={classes.padTop10} item xs>
            <GTextField
              id="areaCode"
              label="Area code"
              type="text"
              setText={setAreaCode}
              textValue={areaCode ? areaCode : address?.areaCode || ""}
              disabled={isLoading}
            />
          </Grid>
          <Grid className={classes.padTop10} item>
            <GButton
              children={SAVE}
              onClick={handleEditProfile}
              loading={isLoading}
              className={classes.button}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} sm={0} md={2} lg={3}></Grid>
    </Grid>
  );
};
