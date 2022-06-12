import React, { FC } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AddOutlined } from "@mui/icons-material";
import { isEmpty } from "lodash";

import { useFetchProviderSocials } from "api/hooks/queries";

import { GButton, GCenterMessage } from "components";

import { useGridSettings } from "./hooks/useGridSettings";
import { AddSocial, DeleteSocial, EditSocial, ViewSocial } from "./components";
import { useStyles } from "./styles";

export const Socials: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { providerSocials } = useFetchProviderSocials({
    variables: { providerId: parseInt(id || "") },
  });

  const gridSettings = useGridSettings({
    classes,
    socials: providerSocials || [],
  });

  return (
    <Grid container direction="column">
      <Grid item>
        <GButton
          children="Add"
          startIcon={<AddOutlined />}
          className={classes.addButton}
          variant="outlined"
          onClick={() => navigate(encodeURI(`add_social`))}
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
