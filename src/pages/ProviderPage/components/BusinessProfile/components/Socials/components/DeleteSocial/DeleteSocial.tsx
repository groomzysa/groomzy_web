import React, { FC, useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { Alert, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";

import { useDeleteSocial } from "api/hooks/mutations";
import { useFetchSocial } from "api/hooks/queries";

import { GButton, GDialogBox, GTextField } from "components";

import { useStyles } from "./styles";

export const DeleteSocial: FC = () => {
  const { id, socialId } = useParams();
  const [searchParams] = useSearchParams();
  const [deleteSocialSuccessMessage, setDeleteSocialSuccessMessage] =
    useState<string>();
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

  const {
    deleteSocialMutate,
    message,
    deleteSocialLoading,
    deleteSocialErrorMessage,
    deleteSocialHasError,
  } = useDeleteSocial();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    setDeleteSocialSuccessMessage(
      `${message}. You will be redirected shorlty.`
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!deleteSocialSuccessMessage) return;

    setTimeout(() => {
      setDeleteSocialSuccessMessage(undefined);
      handleClose();
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteSocialSuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleDeleteSocial = async () => {
    deleteSocialMutate({
      socialId: Number(socialId),
    });
  };

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
  const tittleComponent = <Typography>Delete social</Typography>;

  const mainContent = (
    <Grid container direction="column">
      {deleteSocialSuccessMessage ? (
        <Grid item>
          <Alert severity="success">{deleteSocialSuccessMessage}</Alert>
        </Grid>
      ) : null}
      {fetchSocialErrorMessage || deleteSocialHasError ? (
        <Alert severity="error">
          {fetchSocialErrorMessage || deleteSocialErrorMessage}
        </Alert>
      ) : null}
      <Grid className={classes.padTop10} item>
        <GTextField
          id="social-name"
          label="Social name"
          textValue={social?.name || ""}
          disabled
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <GTextField
          id="social-url"
          label="Social url"
          textValue={social?.url || ""}
          disabled
        />
      </Grid>
    </Grid>
  );

  const footerComponent = (
    <DialogActions>
      <Grid container>
        <Grid className={classes.padRight10} item>
          <GButton
            children={"Cancel"}
            className={classes.cancelButton}
            variant="outlined"
            onClick={handleClose}
            disabled={
              deleteSocialLoading || !isEmpty(deleteSocialSuccessMessage)
            }
          />
        </Grid>
        <Grid item>
          <GButton
            children={"Delete"}
            className={classes.deleteButton}
            variant="outlined"
            onClick={handleDeleteSocial}
            loading={deleteSocialLoading}
            disabled={
              deleteSocialLoading || !isEmpty(deleteSocialSuccessMessage)
            }
          />
        </Grid>
      </Grid>
    </DialogActions>
  );

  return (
    <GDialogBox
      handleClose={handleClose}
      tittleComponent={tittleComponent}
      loading={isLoading}
      children={mainContent}
      footerComponent={footerComponent}
      maxWidth="sm"
    />
  );
};
