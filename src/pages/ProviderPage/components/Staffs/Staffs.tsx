import React, { FC } from "react";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Grid } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { isEmpty } from "lodash";

import { useFetchProviderStaffs } from "api/hooks/queries";
import { GButton, GCenterMessage } from "components";

import { EditStaff, ViewStaff, AddStaff, DeleteStaff } from "./components";
import { useGridSettings } from "./hooks/useGridSettings";
import { useStyles } from "./styles";

export const Staffs: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { providerStaffs } = useFetchProviderStaffs({
    variables: { providerId: parseInt(id || "") },
  });

  const gridSettings = useGridSettings({
    classes,
    providerStaffs: providerStaffs || [],
  });

  return (
    <Grid container direction="column">
      <Grid item>
        <GButton
          children="Add"
          startIcon={<AddOutlined />}
          className={classes.addButton}
          variant="outlined"
          onClick={() => navigate(encodeURI(`add_staff`))}
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        {isEmpty(providerStaffs || []) ? (
          <GCenterMessage message="You currently have no staff listed." />
        ) : (
          <Box className={classes.tableWrapper}>
            <DataGrid className={classes.dataGrid} {...gridSettings} />
          </Box>
        )}
      </Grid>
      <Routes>
        <Route path={encodeURI(`/add_staff`)} element={<AddStaff />} />
        <Route
          path={encodeURI(`/delete_staff/:staffId`)}
          element={<DeleteStaff />}
        />
        <Route
          path={encodeURI(`/edit_staff/:staffId`)}
          element={<EditStaff />}
        />
        <Route
          path={encodeURI(`/view_staff/:staffId`)}
          element={<ViewStaff />}
        />
      </Routes>
    </Grid>
  );
};
