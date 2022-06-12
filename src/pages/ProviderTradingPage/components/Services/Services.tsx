import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { isEmpty } from "lodash";

import { useFetchProviderServices } from "api/hooks/queries";
import { Category } from "api/generated/graphqlTypes";

import { GCenterMessage, GLoadingSpinner } from "components";

import { Service } from "./components";

export const Services: FC = () => {
  const { id } = useParams();

  /**
   *
   * Custom hooks
   *
   */
  const { providerServices, isLoading } = useFetchProviderServices({
    variables: { providerId: parseInt(id || "") },
  });

  if (isLoading) {
    return <GLoadingSpinner />;
  }

  if (isEmpty(providerServices || [])) {
    return <GCenterMessage message="Provider services not yet available." />;
  }

  return (
    <Grid container justifyContent="normal">
      {providerServices?.map((providerService) => {
        const { serviceProviderCategories } = providerService;
        const service = providerService;
        const category = serviceProviderCategories?.[0]?.category;
        return (
          <Grid
            key={`${service.id}_${category?.id}`}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <Box margin={1}>
              <Service service={service} category={category as Category} />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};
