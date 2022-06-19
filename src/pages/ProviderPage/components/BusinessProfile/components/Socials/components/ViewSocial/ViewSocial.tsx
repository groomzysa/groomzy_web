import React, { FC } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Alert, Divider, Grid, Typography } from "@mui/material";

import { useFetchSocial } from "api/hooks/queries";

import { GDialogBox } from "components";

import { useStyles } from "./styles";

export const ViewSocial: FC = () => {
  const { id, socialId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { social, isLoading, fetchSocialErrorMessage } = useFetchSocial({
    variables: { id: Number(socialId) },
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

  const handleClose = () => {
    navigate({
      pathname: encodeURI(`/${id}`),
      search: handleCreateTabIndexSearchParam(),
    });
  };

  /**
   *
   * Templates
   *
   */
  const tittleComponent = <Typography>Social details</Typography>;

  const content = (header: string, value: string) => (
    <Grid item>
      <Grid container>
        <Grid className={classes.header} item>
          {header}
        </Grid>
        <Grid item>
          <Divider sx={{ marginRight: 1 }} orientation="vertical" />
        </Grid>
        <Grid item xs>
          {value}
        </Grid>
      </Grid>
    </Grid>
  );

  const mainContent = (
    <Grid container direction="column">
      {fetchSocialErrorMessage ? (
        <Grid item>
          <Alert severity="error">{fetchSocialErrorMessage}</Alert>
        </Grid>
      ) : null}
      {content("Social name", social?.name || "")}
      {content("Social url", social?.url || "")}
    </Grid>
  );

  return (
    <GDialogBox
      handleClose={handleClose}
      tittleComponent={tittleComponent}
      loading={isLoading}
      children={mainContent}
      maxWidth="sm"
    />
  );
};
