import React, { FC, useState, useEffect } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Alert, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";

import { useFetchService } from "api/hooks/queries";
import { useEditService } from "api/hooks/mutations";
import { CATEGORIES, DURATION_UNITS } from "utils/constants";

import { GButton, GDialogBox, GSelect, GTextField } from "components";
import { ISelectOption } from "store/types";

import { useStyles } from "./styles";

export const EditService: FC = () => {
  const { id, serviceId } = useParams();
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [duration, setDuration] = useState<string>();
  const [durationUnit, setDurationUnit] = useState<ISelectOption>();
  const [category, setCategory] = useState<ISelectOption>();
  const [editServiceSuccessMessage, setEditServiceSuccessMessage] =
    useState<string>();
  const navigate = useNavigate();
  const classes = useStyles();
  const CATEGORIES_ = CATEGORIES.filter(({ value }) => value !== "All");

  /**
   *
   * Custom hooks
   *
   */
  const { service, isLoading, fetchServiceErrorMessage } = useFetchService({
    variables: { id: Number(serviceId) },
  });

  const {
    editServiceMutate,
    message,
    editServiceLoading,
    editServiceErrorMessage,
    editServiceHasError,
  } = useEditService();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    setEditServiceSuccessMessage(`${message}. You will be redirected shorlty.`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!editServiceSuccessMessage) return;

    setTimeout(() => {
      setEditServiceSuccessMessage(undefined);
      handleClose();
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editServiceSuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleEditService = async () => {
    editServiceMutate({
      serviceId: Number(serviceId),
      category: category?.value,
      title,
      description,
      price: price ? Number(price) : undefined,
      duration: duration ? Number(duration) : undefined,
      durationUnit: durationUnit?.value,
    });
  };

  const handleCreateTabIndexSearchParam = () => {
    return createSearchParams({
      tabIndex: searchParams.get("tabIndex")?.toString() || "0",
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
  const tittleComponent = <Typography>Edit service</Typography>;

  const mainContent = (
    <Grid container direction="column">
      {editServiceSuccessMessage ? (
        <Grid item>
          <Alert severity="success">{editServiceSuccessMessage}</Alert>
        </Grid>
      ) : null}
      {fetchServiceErrorMessage || editServiceHasError ? (
        <Alert severity="error">
          {fetchServiceErrorMessage || editServiceErrorMessage}
        </Alert>
      ) : null}
      <Grid className={editServiceSuccessMessage ? classes.padTop10 : ""} item>
        <GSelect
          id="category"
          options={CATEGORIES_}
          selectLabel="Category"
          setSelect={setCategory}
          value={
            category
              ? category
              : CATEGORIES_.find(
                  ({ value }) =>
                    value ===
                    service?.serviceProviderCategories?.[0]?.category?.category
                )
          }
          disabled={editServiceLoading}
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <GTextField
          id="title"
          label="Title"
          textValue={title ? title : service?.title || ""}
          setText={setTitle}
          disabled={editServiceLoading}
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <GTextField
          id="description"
          label="Description"
          textValue={description ? description : service?.description || ""}
          setText={setDescription}
          multiline
          rows={3}
          disabled={editServiceLoading}
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <GTextField
          id="price"
          label="Price"
          textValue={price ? price : String(service?.price) || ""}
          setText={setPrice}
          disabled={editServiceLoading}
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <Grid container>
          <Grid className={classes.duration} item>
            <GTextField
              id="duration"
              label="Duration"
              textValue={duration ? duration : String(service?.duration) || ""}
              setText={setDuration}
              disabled={editServiceLoading}
            />
          </Grid>
          <Grid item xs>
            <GSelect
              id="durationUnit"
              options={DURATION_UNITS}
              selectLabel="Duration unit"
              setSelect={setDurationUnit}
              value={
                durationUnit
                  ? durationUnit
                  : DURATION_UNITS.find(
                      ({ value }) => value === service?.durationUnit
                    )
              }
              disabled={editServiceLoading}
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
            disabled={editServiceLoading || !isEmpty(editServiceSuccessMessage)}
          />
        </Grid>
        <Grid item>
          <GButton
            children={"Edit"}
            className={classes.editButton}
            variant="outlined"
            onClick={handleEditService}
            loading={editServiceLoading || !isEmpty(editServiceSuccessMessage)}
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
