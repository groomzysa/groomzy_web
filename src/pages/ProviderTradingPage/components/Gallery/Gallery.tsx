import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { isEmpty } from "lodash";

import { useFetchProviderGallery } from "api/hooks/queries";

import { GCenterMessage, GLoadingSpinner } from "components";

import { useStyles } from "./styles";

export const Gallery: FC = () => {
  const { id } = useParams();
  const classes = useStyles();
  /**
   *
   * Custom hooks
   *
   */
  const { providerGallery, isLoading } = useFetchProviderGallery({
    variables: { providerId: Number(id) },
  });

  if (isLoading) {
    return <GLoadingSpinner />;
  }

  if (isEmpty(providerGallery || [])) {
    return <GCenterMessage message="Provider gallery not yet available." />;
  }

  return (
    <Grid className={classes.padBottom} container spacing={1}>
      {providerGallery?.map((image) => (
        <Grid key={image?.id} item xs={12} sm={6} md={4} lg={3}>
          <img src={image?.url || ""} width={"100%"} alt={image?.name || ""} />
        </Grid>
      ))}
    </Grid>
  );
};
