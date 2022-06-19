import React, { FC } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { Alert, Grid, Typography } from "@mui/material";

import { useFetchGallery } from "api/hooks/queries";

import { GDialogBox, GTextField } from "components";

import { useStyles } from "./styles";

export const ViewGalleryImage: FC = () => {
  const { id, galleryId } = useParams();
  const [searchParams] = useSearchParams();
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
  const handleCreateTabIndexSearchParam = () => {
    return createSearchParams({
      tabIndex: searchParams.get("tabIndex")?.toString() || "3",
    }).toString();
  };

  const handleClose = () => {
    navigate({
      pathname: encodeURI(`/${id}`),
      search: handleCreateTabIndexSearchParam(),
    });
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
