import React, { FC } from "react";
import {
  Route,
  Routes,
  useParams,
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Grid } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { isEmpty } from "lodash";

import { useFetchProviderStaffs } from "api/hooks/queries";
import { GButton, GCenterMessage, GLoadingSpinner } from "components";

import { EditStaff, ViewStaff, AddStaff, DeleteStaff } from "./components";
import { useGridSettings } from "./hooks/useGridSettings";
import { useStyles } from "./styles";

export const Staffs: FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { providerStaffs, isLoading } = useFetchProviderStaffs({
    variables: { providerId: parseInt(id || "") },
  });

  const gridSettings = useGridSettings({
    classes,
    providerStaffs: providerStaffs || [],
  });

  /**
   *
   * Handlers
   *
   */
  const handleCreateTabIndexSearchParam = () => {
    return createSearchParams({
      tabIndex: searchParams.get("tabIndex")?.toString() || "2",
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
              pathname: encodeURI(`add_staff`),
              search: handleCreateTabIndexSearchParam(),
            })
          }
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
