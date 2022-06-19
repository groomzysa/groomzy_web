import React, { FC, useEffect, useMemo, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { debounce, isEmpty } from "lodash";

import { useFetchProviders } from "api/hooks/queries";
import { Provider as IProvider } from "api/generated/schema";
import { CATEGORIES } from "utils/constants";

import {
  GCenterMessage,
  GLoadingSpinner,
  GSelect,
  GTextField,
  Provider,
} from "components";

import { useApp } from "store";
import { ISelectOption } from "store/types";

import { useStyles } from "./styles";

export const ProvidersPage: FC = () => {
  const [enabledProviders, setEnabledProviders] = useState<IProvider[]>([]);
  const [category, setCategory] = useState<ISelectOption>();
  const [search, setSearch] = useState<string>("");
  const [searchtext, setSearchText] = useState<string>("");

  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { providersSearch, setProvidersSearch } = useApp();
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

  useEffect(() => {
    setProvidersSearch({
      search,
      category: category?.value,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  useEffect(() => {
    debouncedChangeHandler(searchtext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchtext]);

  /**
   *
   * Handlers
   *
   */
  const handleSearch = (text: string) => {
    setSearch(text.trim());
  };

  const debouncedChangeHandler = useMemo(() => debounce(handleSearch, 800), []);

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
    <Grid container direction="column">
      <Grid item>
        <Grid container justifyContent="center">
          <Grid className={classes.searchInput} item xs>
            <GTextField
              id="search-provider"
              label="Search provider"
              placeholder="Search for service provider"
              startIcon={<SearchOutlined />}
              textValue={searchtext}
              setText={setSearchText}
              autoFocus={!!searchtext}
              fullWidth
            />
          </Grid>
          <Grid item className={classes.categorySelect}>
            <GSelect
              id="category"
              options={CATEGORIES}
              selectLabel="Filter by category"
              setSelect={setCategory}
              value={category}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        {isEmpty(enabledProviders) ? (
          <GCenterMessage
            message={`There are ${
              !search && !category ? "currently" : ""
            } no service providers ${
              (search || category) &&
              "under the specified search. Please adjust your search."
            }`}
          />
        ) : (
          <Grid container justifyContent="normal">
            {enabledProviders.map((provider) => {
              return (
                <Grid key={provider.id} item xs={12} sm={6} md={4} lg={3}>
                  <Box margin={1}>
                    <Provider provider={provider} />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
