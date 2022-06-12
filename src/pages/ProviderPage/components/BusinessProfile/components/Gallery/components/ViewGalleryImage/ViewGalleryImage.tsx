import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Grid, Typography } from "@mui/material";

import { useFetchGallery } from "api/hooks/queries";
import { setLocalStorage } from "utils/localStorage";

import { GDialogBox, GTextField } from "components";

import { useStyles } from "./styles";

export const ViewGalleryImage: FC = () => {
  const { id, galleryId } = useParams();
  const navigate = useNavigate();

  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { gallery, fetchGalleryErrorMessage } = useFetchGallery({
    variables: { id: Number(galleryId) },
  });

  /**
   *
   * Handlers
   *
   */
  const handleClose = () => {
    setLocalStorage("provderTabIndex", "");
    navigate(encodeURI(`/${id}`));
  };

  /**
   *
   * Templates
   *
   */
  const tittleComponent = <Typography>Gallery image details</Typography>;

  const mainContent = (
    <Grid container direction="column">
      {fetchGalleryErrorMessage ? (
        <Alert severity="error">{fetchGalleryErrorMessage}</Alert>
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

  return (
    <GDialogBox
      handleClose={handleClose}
      tittleComponent={tittleComponent}
      children={mainContent}
      maxWidth="sm"
    />
  );
};
