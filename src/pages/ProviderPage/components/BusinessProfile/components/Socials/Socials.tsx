import React, { FC } from "react";
import {
  createSearchParams,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AddOutlined } from "@mui/icons-material";
import { isEmpty } from "lodash";

import { useFetchProviderSocials } from "api/hooks/queries";

import { GButton, GCenterMessage, GLoadingSpinner } from "components";

import { useGridSettings } from "./hooks/useGridSettings";
import { AddSocial, DeleteSocial, EditSocial, ViewSocial } from "./components";
import { useStyles } from "./styles";

export const Socials: FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { providerSocials, isLoading } = useFetchProviderSocials({
    variables: { providerId: parseInt(id || "") },
  });

  const gridSettings = useGridSettings({
    classes,
    socials: providerSocials || [],
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

  if (isLoading) {
    return <GLoadingSpinner />;
  }

  return (
    <Grid container direction="column">
      <Grid item>
        <GButton
          children="Add"
          startIcon={<AddOutlined />}
          className={classes.addButton}
          variant="outlined"
          onClick={() =>
            navigate({
              pathname: encodeURI(`add_social`),
              search: handleCreateTabIndexSearchParam(),
            })
          }
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        {isEmpty(providerSocials || []) ? (
          <GCenterMessage message="You currently have no socials listed." />
        ) : (
          <Box className={classes.tableWrapper}>
            <DataGrid className={classes.dataGrid} {...gridSettings} />
          </Box>
        )}
      </Grid>
      <Routes>
        <Route path={encodeURI(`/add_social`)} element={<AddSocial />} />
        <Route
          path={encodeURI(`/delete_social/:socialId`)}
          element={<DeleteSocial />}
        />
        <Route
          path={encodeURI(`/edit_social/:socialId`)}
          element={<EditSocial />}
        />
        <Route
          path={encodeURI(`/view_social/:socialId`)}
          element={<ViewSocial />}
        />
      </Routes>
    </Grid>
  );
};
