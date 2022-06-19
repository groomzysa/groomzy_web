import React, { FC } from "react";
import {
  useParams,
  useNavigate,
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { Box, Grid } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { isEmpty } from "lodash";

import { useFetchProviderGallery } from "api/hooks/queries";
import { GButton, GCenterMessage, GLoadingSpinner } from "components";

import {
  AddGalleryImage,
  DeleteGalleryImage,
  ViewGalleryImage,
} from "./components";
import { useGridSettings } from "./hooks/useGridSettings";
import { useStyles } from "./styles";

export const Gallery: FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { providerGallery, isLoading } = useFetchProviderGallery({
    variables: { providerId: Number(id) },
  });

  const gridSettings = useGridSettings({
    classes,
    gallery: providerGallery || [],
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
              pathname: encodeURI(`add_gallery_image`),
              search: handleCreateTabIndexSearchParam(),
            })
          }
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        {isEmpty(providerGallery || []) ? (
          <GCenterMessage message="You currently have no gallery images listed." />
        ) : (
          <Box className={classes.tableWrapper}>
            <DataGrid className={classes.dataGrid} {...gridSettings} />
          </Box>
        )}
      </Grid>
      <Routes>
        <Route
          path={encodeURI(`/add_gallery_image`)}
          element={<AddGalleryImage />}
        />
        <Route
          path={encodeURI(`/delete_gallery_image/:galleryId`)}
          element={<DeleteGalleryImage />}
        />
        <Route
          path={encodeURI(`/view_gallery_image/:galleryId`)}
          element={<ViewGalleryImage />}
        />
      </Routes>
    </Grid>
  );
};
