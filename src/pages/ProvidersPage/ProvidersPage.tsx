import React, { FC, useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";

import { useFetchProviders } from "api/hooks/queries";
import { Provider as IProvider } from "api/generated/graphqlTypes";

import { GCenterMessage, GLoadingSpinner, Provider } from "components";

import { useApp } from "store";
import { isEmpty } from "lodash";

export const ProvidersPage: FC = () => {
  const [enabledProviders, setEnabledProviders] = useState<IProvider[]>([]);

  /**
   *
   * Custom hooks
   *
   */
  const { providersSearch } = useApp();
  const { providers, isLoading, errorMessage } = useFetchProviders({
    variables: providersSearch,
  });

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!providers) return;
    const activeProviders = providers.filter((provider) => {
      let show: boolean = true;
      const { serviceProviderCategories, address, profile } = provider;
      if (serviceProviderCategories && serviceProviderCategories?.length <= 0) {
        show = false;
      }

      if (!address && !profile) {
        show = false;
      }

      return show;
    });

    setEnabledProviders(activeProviders);
  }, [providers]);

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

  if (isEmpty(enabledProviders)) {
    return (
      <GCenterMessage message="There are currently no service providers" />
    );
  }

  return (
    <Grid container justifyContent="normal">
      {enabledProviders.map((provider) => {
        return (
          <Grid key={provider.id} item xs={12} sm={6} lg={4}>
            <Box margin={1}>
              <Provider provider={provider} />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};
