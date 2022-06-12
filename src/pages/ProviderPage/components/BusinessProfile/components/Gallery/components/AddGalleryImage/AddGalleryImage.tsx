import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, Button, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import clsx from "clsx";

import { useAddGallery } from "api/hooks/mutations";
import { setLocalStorage } from "utils/localStorage";

import { GButton, GDialogBox, GImageCrop, GTextField } from "components";

import { useStyles } from "./styles";
import { ImageOutlined } from "@mui/icons-material";

export const AddGalleryImage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [galleryImage, setGalleryImage] = useState<File>();
  const [galleryViewImage, setGalleryViewImage] = useState<string>();
  const [rawGalleryImage, setRawGalleryImage] = useState<File>();
  const [addGallerySuccessMessage, setAddGallerySuccessMessage] =
    useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const {
    addGalleryMutate,
    message,
    addGalleryLoading,
    addGalleryErrorMessage,
    addGalleryHasError,
  } = useAddGallery({
    variables: {
      name,
      galleryImageFile: galleryImage,
    },
  });

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    setAddGallerySuccessMessage(`${message}. You will be redirected shorlty.`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!addGallerySuccessMessage) return;

    setTimeout(() => {
      setAddGallerySuccessMessage(undefined);
      handleClose();
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addGallerySuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleAddGallery = async () => {
    if (!name || !galleryImage) return;
    addGalleryMutate();
  };

  const handleClose = () => {
    setLocalStorage("provderTabIndex", "");
    navigate(encodeURI(`/${id}`));
  };

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event?.target?.files?.[0];
    if (!selectedImage) return;
    const imageReader = new FileReader();
    imageReader.readAsDataURL(selectedImage);
    imageReader.onloadend = () => {
      setGalleryViewImage(imageReader.result as string);
    };
    setRawGalleryImage(selectedImage);
  };

  /**
   *
   * Templates
   *
   */
  const tittleComponent = <Typography>Add gallery image</Typography>;

  const galerymageInput = (
    <>
      <Grid container alignItems="center">
        <Grid item className={classes.padRight10}>
          <ImageOutlined className={classes.icon} />
        </Grid>
        <Grid className={classes.imgName} item>
          {rawGalleryImage?.name ? rawGalleryImage?.name : "Add gallery image"}
        </Grid>
      </Grid>
      <input
        type="file"
        name="galleryImage"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileSelected}
        hidden
      />
    </>
  );

  const imageInput = (
    <Grid container direction="column" className={classes.marginBottom20}>
      {addGallerySuccessMessage ? (
        <Grid item>
          <Alert severity="success">{addGallerySuccessMessage}</Alert>
        </Grid>
      ) : null}
      {addGalleryHasError || errorMessage ? (
        <Grid item>
          <Alert severity="error">
            {addGalleryErrorMessage || errorMessage}
          </Alert>
        </Grid>
      ) : null}
      <Grid className={clsx(classes.padTop10, classes.newImage)} item xs>
        <Grid container direction="column">
          <Grid item>
            <GTextField
              id="gallery-name"
              label="Gallery image name"
              type="text"
              setText={setName}
              textValue={name}
              disabled={addGalleryLoading}
            />
          </Grid>
          <Grid className={classes.padTop10} item>
            <Button
              variant="text"
              component="label"
              color="primary"
              disabled={addGalleryLoading}
              disableRipple
            >
              {galerymageInput}
            </Button>
          </Grid>
          <Grid item className={rawGalleryImage ? classes.imageContainer : ""}>
            <GImageCrop
              className={rawGalleryImage ? classes.imageContainer : ""}
              maxHeightCrop={200}
              maxWidthCrop={200}
              imageName={`gallery_image_${Date.now()}_${id}.${
                rawGalleryImage?.type?.split("/")?.[1]
              }`}
              rawImage={rawGalleryImage}
              setErrorMessage={setErrorMessage}
              setFinalImage={setGalleryImage}
              viewImage={galleryViewImage}
              circularCrop={false}
            />
          </Grid>
        </Grid>
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
            disabled={addGalleryLoading || !isEmpty(addGallerySuccessMessage)}
          />
        </Grid>
        <Grid item>
          <GButton
            children={"Add"}
            className={classes.addButton}
            variant="outlined"
            onClick={handleAddGallery}
            disabled={addGalleryLoading || !isEmpty(addGallerySuccessMessage)}
            loading={addGalleryLoading}
          />
        </Grid>
      </Grid>
    </DialogActions>
  );

  return (
    <GDialogBox
      handleClose={handleClose}
      tittleComponent={tittleComponent}
      children={imageInput}
      footerComponent={footerComponent}
      maxWidth="sm"
    />
  );
};
