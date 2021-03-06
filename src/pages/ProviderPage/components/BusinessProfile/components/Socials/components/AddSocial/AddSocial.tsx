import React, { FC, useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { Alert, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";

import { useAddSocial } from "api/hooks/mutations";

import { GButton, GDialogBox, GTextField } from "components";

import { useStyles } from "./styles";

export const AddSocial: FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [urlError, setUrlError] = useState<string>("");
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
  } = useAddSocial();

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
    if (handleInputHasError()) return;
    addSocialMutate({
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

  const handleInputHasError = () => {
    let hasError = false;
    if (!name) {
      setNameError("Social name is required");
      hasError = true;
    }

    if (!url) {
      setUrlError("Social link is required");
      hasError = true;
    }

    return hasError;
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
          errorMessage={nameError}
          resetErrorMessage={setNameError}
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <GTextField
          id="social-url"
          label="Social url"
          textValue={url}
          setText={setUrl}
          disabled={addSocialLoading}
          errorMessage={urlError}
          resetErrorMessage={setUrlError}
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
