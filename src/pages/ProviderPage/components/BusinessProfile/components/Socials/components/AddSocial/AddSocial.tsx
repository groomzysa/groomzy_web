import React, { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";

import { useAddSocial } from "api/hooks/mutations";
import { setLocalStorage } from "utils/localStorage";

import { GButton, GDialogBox, GTextField } from "components";

import { useStyles } from "./styles";

export const AddSocial: FC = () => {
  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [addSocialSuccessMessage, setAddSocialSuccessMessage] =
    useState<string>();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const {
    addSocialMutate,
    message,
    addSocialLoading,
    addSocialErrorMessage,
    addSocialHasError,
  } = useAddSocial({
    variables: {
      name,
      url,
    },
  });

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    setAddSocialSuccessMessage(`${message}. You will be redirected shorlty.`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!addSocialSuccessMessage) return;

    setTimeout(() => {
      setAddSocialSuccessMessage(undefined);
      handleClose();
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addSocialSuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleAddSocial = async () => {
    if (!name || !url) return;
    addSocialMutate();
  };

  const handleClose = () => {
    setLocalStorage("provderTabIndex", "");
    navigate(encodeURI(`/${id}`));
  };

  /**
   *
   * Templates
   *
   */
  const tittleComponent = <Typography>Add social</Typography>;

  const mainContent = (
    <Grid container direction="column">
      {addSocialSuccessMessage ? (
        <Grid item>
          <Alert severity="success">{addSocialSuccessMessage}</Alert>
        </Grid>
      ) : null}
      {addSocialHasError ? (
        <Grid item>
          <Alert severity="error">{addSocialErrorMessage}</Alert>
        </Grid>
      ) : null}

      <Grid className={classes.padTop10} item>
        <GTextField
          id="social-name"
          label="Social name"
          textValue={name}
          setText={setName}
          disabled={addSocialLoading}
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <GTextField
          id="social-url"
          label="Social url"
          textValue={url}
          setText={setUrl}
          disabled={addSocialLoading}
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
            disabled={addSocialLoading || !isEmpty(addSocialSuccessMessage)}
          />
        </Grid>
        <Grid item>
          <GButton
            children={"Add"}
            className={classes.addButton}
            variant="outlined"
            onClick={handleAddSocial}
            disabled={addSocialLoading || !isEmpty(addSocialSuccessMessage)}
          />
        </Grid>
      </Grid>
    </DialogActions>
  );

  return (
    <GDialogBox
      handleClose={handleClose}
      tittleComponent={tittleComponent}
      children={mainContent}
      footerComponent={footerComponent}
      maxWidth="sm"
    />
  );
};
