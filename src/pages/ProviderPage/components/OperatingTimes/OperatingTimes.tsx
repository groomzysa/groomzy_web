import React, { FC } from "react";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Grid } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { isEmpty } from "lodash";

import { useFetchProviderOperatingTimes } from "api/hooks/queries";
import { GButton, GCenterMessage } from "components";

import {
  EditOperatingTime,
  ViewOperatingTime,
  AddOperatingTime,
  DeleteOperatingTime,
} from "./components";
import { useGridSettings } from "./hooks/useGridSettings";
import { useStyles } from "./styles";

export const OperatingTimes: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { providerOperatingTimes } = useFetchProviderOperatingTimes({
    variables: { providerId: parseInt(id || "") },
  });

  const gridSettings = useGridSettings({
    classes,
    providerOperatingTimes: providerOperatingTimes || [],
  });

  return (
    <Grid container direction="column">
      <Grid item>
        <GButton
          children="Add"
          startIcon={<AddOutlined />}
          className={classes.addButton}
          variant="outlined"
          onClick={() => navigate(encodeURI(`add_operating_time`))}
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        {isEmpty(providerOperatingTimes || []) ? (
          <GCenterMessage message="You currently have no business operating times listed." />
        ) : (
          <Box className={classes.tableWrapper}>
            <DataGrid className={classes.dataGrid} {...gridSettings} />
          </Box>
        )}
      </Grid>
      <Routes>
        <Route
          path={encodeURI(`/add_operating_time`)}
          element={<AddOperatingTime />}
        />
        <Route
          path={encodeURI(`/delete_operating_time/:operatingTimeId`)}
          element={<DeleteOperatingTime />}
        />
        <Route
          path={encodeURI(`/edit_operating_time/:operatingTimeId`)}
          element={<EditOperatingTime />}
        />
        <Route
          path={encodeURI(`/view_operating_time/:operatingTimeId`)}
          element={<ViewOperatingTime />}
        />
      </Routes>
    </Grid>
  );
};
