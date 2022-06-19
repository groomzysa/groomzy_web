import React, { FC, useState, useEffect } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Alert, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";

import { useFetchSocial } from "api/hooks/queries";
import { useEditSocial } from "api/hooks/mutations";

import { GButton, GDialogBox, GTextField } from "components";

import { useStyles } from "./styles";

export const EditSocial: FC = () => {
  const { id, socialId } = useParams();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState<string>();
  const [url, setUrl] = useState<string>();
  const [editSocialSuccessMessage, setEditSocialSuccessMessage] =
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
    editSocialMutate,
    message,
    editSocialLoading,
    editSocialErrorMessage,
    editSocialHasError,
  } = useEditSocial();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    setEditSocialSuccessMessage(`${message}. You will be redirected shorlty.`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!editSocialSuccessMessage) return;

    setTimeout(() => {
      setEditSocialSuccessMessage(undefined);
      handleClose();
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editSocialSuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleEditSocial = async () => {
    editSocialMutate({
      socialId: Number(socialId),
      name,
      url,
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
  const tittleComponent = <Typography>Edit social</Typography>;

  const mainContent = (
    <Grid container direction="column">
      {editSocialSuccessMessage ? (
        <Grid item>
          <Alert severity="success">{editSocialSuccessMessage}</Alert>
        </Grid>
      ) : null}
      {fetchSocialErrorMessage || editSocialHasError ? (
        <Alert severity="error">
          {fetchSocialErrorMessage || editSocialErrorMessage}
        </Alert>
      ) : null}
      <Grid className={classes.padTop10} item>
        <GTextField
          id="social-name"
          label="Social name"
          textValue={name ? name : social?.name || ""}
          setText={setName}
          disabled={editSocialLoading || !isEmpty(editSocialSuccessMessage)}
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <GTextField
          id="social-url"
          label="Social url"
          textValue={url ? url : social?.url || ""}
          setText={setUrl}
          disabled={editSocialLoading || !isEmpty(editSocialSuccessMessage)}
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
            disabled={editSocialLoading || !isEmpty(editSocialSuccessMessage)}
          />
        </Grid>
        <Grid item>
          <GButton
            children={"Edit"}
            className={classes.editButton}
            variant="outlined"
            onClick={handleEditSocial}
            loading={editSocialLoading || !isEmpty(editSocialSuccessMessage)}
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
