import React, { FC } from "react";
import {
  Route,
  Routes,
  useParams,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Grid } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { isEmpty } from "lodash";

import { useFetchProviderOperatingTimes } from "api/hooks/queries";
import { GButton, GCenterMessage, GLoadingSpinner } from "components";

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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { providerOperatingTimes, isLoading } = useFetchProviderOperatingTimes({
    variables: { providerId: parseInt(id || "") },
  });

  const gridSettings = useGridSettings({
    classes,
    providerOperatingTimes: providerOperatingTimes || [],
  });

  /**
   *
   * Handlers
   *
   */
  const handleCreateTabIndexSearchParam = () => {
    return createSearchParams({
      tabIndex: searchParams.get("tabIndex")?.toString() || "1",
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
              pathname: encodeURI(`add_operating_time`),
              search: handleCreateTabIndexSearchParam(),
            })
          }
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
