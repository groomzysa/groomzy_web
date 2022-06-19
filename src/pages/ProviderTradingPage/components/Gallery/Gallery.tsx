import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { isEmpty } from "lodash";

import { useFetchProviderGallery } from "api/hooks/queries";

import { GCenterMessage, GLoadingSpinner } from "components";

export const Gallery: FC = () => {
  const { id } = useParams();
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
    <Grid container spacing={1}>
      {providerGallery?.map((image) => (
        <Grid key={image?.id} item xs={12} sm={6} md={4} lg={3}>
          <img src={image?.url || ""} width={"100%"} alt={image?.name || ""} />
        </Grid>
      ))}
    </Grid>
  );
};
