import React, { FC } from "react";
import { Provider } from "components";
import { useApp } from "store";
import { Box, CircularProgress, Container, Divider, Grid } from "@mui/material";
import { useFetchProviders } from "api/hooks/queries";
import { useStyles } from "./styles";

export const ProviderPage: FC = () => {
  const { providersSearch } = useApp();
  const { providers, isLoading, errorMessage } = useFetchProviders({
    variables: { ...providersSearch },
  });
  const classes = useStyles();

  if (isLoading) {
    return <CircularProgress />;
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
          <Grid key={provider.id} item xs={12} md={6} lg={4}>
            <Box margin={1}>
              <Provider provider={provider} />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};
