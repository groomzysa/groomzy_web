import React, { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";

import { useFetchService } from "api/hooks/queries";
import { useDeleteService } from "api/hooks/mutations";
import { CATEGORIES, DURATION_UNITS } from "utils/constants";
import { setLocalStorage } from "utils/localStorage";

import { GButton, GDialogBox, GSelect, GTextField } from "components";

import { useStyles } from "./styles";

export const DeleteService: FC = () => {
  const { id, serviceId, categoryId } = useParams();
  const [deleteServiceSuccessMessage, setDeleteServiceSuccessMessage] =
    useState<string>();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const { service, isLoading, fetchServiceErrorMessage } = useFetchService({
    variables: { id: Number(serviceId) },
  });

  const {
    deleteServiceMutate,
    message,
    deleteServiceLoading,
    deleteServiceErrorMessage,
    deleteServiceHasError,
  } = useDeleteService({
    variables: {
      serviceId: Number(serviceId),
      categoryId: Number(categoryId),
    },
  });

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    setDeleteServiceSuccessMessage(
      `${message}. You will be redirected shorlty.`
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!deleteServiceSuccessMessage) return;

    setTimeout(() => {
      setDeleteServiceSuccessMessage(undefined);
      handleClose();
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteServiceSuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleDeleteService = async () => {
    deleteServiceMutate();
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
  const tittleComponent = <Typography>Delete service</Typography>;

  const mainContent = (
    <Grid container direction="column">
      {deleteServiceSuccessMessage ? (
        <Grid item>
          <Alert severity="success">{deleteServiceSuccessMessage}</Alert>
        </Grid>
      ) : null}
      {fetchServiceErrorMessage || deleteServiceHasError ? (
        <Alert severity="error">
          {fetchServiceErrorMessage || deleteServiceErrorMessage}
        </Alert>
      ) : null}
      <Grid
        className={deleteServiceSuccessMessage ? classes.padTop10 : ""}
        item
      >
        <GSelect
          id="category"
          options={CATEGORIES}
          selectLabel="Category"
          value={CATEGORIES.find(
            ({ value }) =>
              value ===
              service?.serviceProviderCategories?.[0]?.category?.category
          )}
          setSelect={() => {}}
          disabled
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <GTextField
          id="title"
          label="Title"
          textValue={service?.title || ""}
          disabled
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <GTextField
          id="description"
          label="Description"
          textValue={service?.description || ""}
          multiline
          rows={3}
          disabled
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <GTextField
          id="price"
          label="Price"
          textValue={String(service?.price) || ""}
          disabled
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <Grid container>
          <Grid className={classes.duration} item>
            <GTextField
              id="duration"
              label="Duration"
              textValue={String(service?.duration) || ""}
              disabled
            />
          </Grid>
          <Grid item xs>
            <GSelect
              id="durationUnit"
              options={DURATION_UNITS}
              selectLabel="Duration unit"
              setSelect={() => {}}
              value={DURATION_UNITS.find(
                ({ value }) => value === service?.durationUnit
              )}
              disabled
            />
          </Grid>
        </Grid>
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
              deleteServiceLoading || !isEmpty(deleteServiceSuccessMessage)
            }
          />
        </Grid>
        <Grid item>
          <GButton
            children={"Delete"}
            className={classes.editButton}
            variant="outlined"
            onClick={handleDeleteService}
            loading={deleteServiceLoading}
            disabled={
              deleteServiceLoading || !isEmpty(deleteServiceSuccessMessage)
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
