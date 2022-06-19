import React, { FC } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { Alert, Divider, Grid, Typography } from "@mui/material";

import { useFetchStaff } from "api/hooks/queries";
import { GDialogBox } from "components";

import { useStyles } from "./styles";

export const ViewStaff: FC = () => {
  const { id, staffId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { staff, isLoading, fetchStaffErrorMessage } = useFetchStaff({
    variables: { id: Number(staffId) },
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
  const tittleComponent = <Typography>Staff details</Typography>;

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
      {fetchStaffErrorMessage ? (
        <Grid item>
          <Alert severity="error">{fetchStaffErrorMessage}</Alert>
        </Grid>
      ) : null}
      {content("Full name", staff?.fullName || "")}
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
