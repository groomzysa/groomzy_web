import React, { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";

import { setLocalStorage } from "utils/localStorage";
import { GButton, GDialogBox, GTextField } from "components";
import { useFetchGallery } from "api/hooks/queries";
import { useDeleteGallery } from "api/hooks/mutations";

import { useStyles } from "./styles";

export const DeleteGalleryImage: FC = () => {
  const { id, galleryId } = useParams();
  const navigate = useNavigate();
  const [deleteGallerySuccessMessage, setDeleteGallerySuccessMessage] =
    useState<string>();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { gallery, fetchGalleryErrorMessage } = useFetchGallery({
    variables: { id: Number(galleryId) },
  });

  const {
    deleteGalleryMutate,
    message,
    deleteGalleryLoading,
    deleteGalleryErrorMessage,
    deleteGalleryHasError,
  } = useDeleteGallery({
    variables: {
      galleryId: Number(galleryId),
      fileName: gallery?.fileName || "",
    },
  });

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    setDeleteGallerySuccessMessage(
      `${message}. You will be redirected shorlty.`
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!deleteGallerySuccessMessage) return;

    setTimeout(() => {
      setDeleteGallerySuccessMessage(undefined);
      handleClose();
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteGallerySuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleDeleteGallery = async () => {
    deleteGalleryMutate();
  };

  const handleClose = () => {
    setLocalStorage("provderTabIndex", "");
    navigate(encodeURI(`/${id}`));
  };

  /**
   *
   * Templates
   *
   */
  const tittleComponent = <Typography>Delete gallery image</Typography>;

  const mainContent = (
    <Grid container direction="column">
      {deleteGallerySuccessMessage ? (
        <Grid item>
          <Alert severity="success">{deleteGallerySuccessMessage}</Alert>
        </Grid>
      ) : null}
      {fetchGalleryErrorMessage || deleteGalleryHasError ? (
        <Alert severity="error">
          {fetchGalleryErrorMessage || deleteGalleryErrorMessage}
        </Alert>
      ) : null}
      <Grid className={classes.padTop10} item>
        <GTextField
          id="gallery-name"
          label="Gallery image name"
          textValue={gallery?.name || ""}
          disabled
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <img
          src={gallery?.url || ""}
          alt={gallery?.name || "Gallery image"}
          width={200}
        />
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
            disabled={
              deleteGalleryLoading || !isEmpty(deleteGallerySuccessMessage)
            }
          />
        </Grid>
        <Grid item>
          <GButton
            children={"Delete"}
            className={classes.deleteButton}
            variant="outlined"
            onClick={handleDeleteGallery}
            loading={deleteGalleryLoading}
            disabled={
              deleteGalleryLoading || !isEmpty(deleteGallerySuccessMessage)
            }
          />
        </Grid>
      </Grid>
    </DialogActions>
  );

  return (
    <GDialogBox
      handleClose={handleClose}
      tittleComponent={tittleComponent}
      children={mainContent}
      footerComponent={footerComponent}
      maxWidth="sm"
    />
  );
};
