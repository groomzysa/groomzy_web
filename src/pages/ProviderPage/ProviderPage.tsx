import React, { FC } from "react";
import { Box, Container, Grid } from "@mui/material";

import { useApp } from "store";
import { useFetchProviders } from "api/hooks/queries";

import { GLoadingSpinner, Provider } from "components";

export const ProviderPage: FC = () => {
  /**
   *
   * Custom hooks
   *
   */
  const { providersSearch } = useApp();
  const { providers, isLoading, errorMessage } = useFetchProviders({
    variables: { ...providersSearch },
  });

  if (isLoading) {
    return <GLoadingSpinner />;
  }

  if (errorMessage) {
    return (
      <Container>
        <Box color="red">{errorMessage}</Box>
      </Container>
    );
  }

  return (
    <Grid container justifyContent="normal">
      {providers.map((provider) => {
        return (
          <Grid key={provider.id} item xs={12} sm={6} md={6} lg={4}>
            <Box margin={1}>
              <Provider provider={provider} />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};
