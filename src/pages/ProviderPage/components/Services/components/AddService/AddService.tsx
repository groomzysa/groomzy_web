import React, { FC, useState, useEffect } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Alert, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";

import { useAddService } from "api/hooks/mutations";
import { CATEGORIES, DURATION_UNITS } from "utils/constants";

import { GButton, GDialogBox, GSelect, GTextField } from "components";
import { ISelectOption } from "store/types";

import { useStyles } from "./styles";

export const AddService: FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [price, setPrice] = useState<string>();
  const [priceError, setPriceError] = useState<string>();
  const [description, setDescription] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [duration, setDuration] = useState<string>();
  const [durationError, setDurationError] = useState<string>();
  const [durationUnit, setDurationUnit] = useState<ISelectOption>();
  const [durationUnitError, setDurationUnitError] = useState<string>("");
  const [category, setCategory] = useState<ISelectOption>();
  const [categoryError, setCategoryError] = useState<string>("");
  const [addServiceSuccessMessage, setAddServiceSuccessMessage] =
    useState<string>();
  const navigate = useNavigate();
  const classes = useStyles();

  /**
   *
   * Custom hooks
   *
   */
  const {
    addServiceMutate,
    message,
    addServiceLoading,
    addServiceErrorMessage,
    addServiceHasError,
  } = useAddService();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (!message) return;
    setAddServiceSuccessMessage(`${message}. You will be redirected shorlty.`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (!addServiceSuccessMessage) return;

    setTimeout(() => {
      setAddServiceSuccessMessage(undefined);
      handleClose();
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addServiceSuccessMessage]);

  /**
   *
   * Handlers
   *
   */
  const handleAddService = async () => {
    if (handleInputHasError()) return;
    addServiceMutate({
      category: category?.value || "",
      title,
      description,
      price: Number(price),
      duration: Number(duration),
      durationUnit: durationUnit?.value || "",
      inHouse: false,
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

  const handleInputHasError = () => {
    let hasError = false;
    if (!category) {
      setCategoryError("Category is required");
      hasError = true;
    }
    if (!title) {
      setTitleError("Title is required");
      hasError = true;
    }

    if (!description) {
      setDescriptionError("Description is required");
      hasError = true;
    }

    if (!price) {
      setPriceError("Price is required");
      hasError = true;
    }

    if (!duration) {
      setDurationError("Duration is required");
      hasError = true;
    }

    if (!durationUnit) {
      setDurationUnitError("Duration unit is required");
      hasError = true;
    }

    return hasError;
  };

  /**
   *
   * Templates
   *
   */
  const tittleComponent = <Typography>Add service</Typography>;

  const mainContent = (
    <Grid container direction="column">
      {addServiceSuccessMessage ? (
        <Grid item>
          <Alert severity="success">{addServiceSuccessMessage}</Alert>
        </Grid>
      ) : null}
      {addServiceHasError ? (
        <Alert severity="error">{addServiceErrorMessage}</Alert>
      ) : null}
      <Grid className={addServiceSuccessMessage ? classes.padTop10 : ""} item>
        <GSelect
          id="category"
          options={CATEGORIES}
          selectLabel="Category"
          setSelect={setCategory}
          value={category}
          disabled={addServiceLoading}
          errorMessage={categoryError}
          resetErrorMessage={setCategoryError}
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <GTextField
          id="title"
          label="Title"
          textValue={title}
          setText={setTitle}
          disabled={addServiceLoading}
          errorMessage={titleError}
          resetErrorMessage={setTitleError}
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <GTextField
          id="description"
          label="Description"
          textValue={description}
          setText={setDescription}
          multiline
          rows={3}
          disabled={addServiceLoading}
          errorMessage={descriptionError}
          resetErrorMessage={setDescriptionError}
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <GTextField
          id="price"
          label="Price"
          textValue={price}
          setText={setPrice}
          disabled={addServiceLoading}
          errorMessage={priceError}
          resetErrorMessage={setPriceError}
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <Grid container>
          <Grid className={classes.duration} item>
            <GTextField
              id="duration"
              label="Duration"
              textValue={duration}
              setText={setDuration}
              disabled={addServiceLoading}
              errorMessage={durationError}
              resetErrorMessage={setDurationError}
            />
          </Grid>
          <Grid item xs>
            <GSelect
              id="durationUnit"
              options={DURATION_UNITS}
              selectLabel="Duration unit"
              setSelect={setDurationUnit}
              value={durationUnit}
              disabled={addServiceLoading}
              errorMessage={durationUnitError}
              resetErrorMessage={setDurationUnitError}
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
            disabled={addServiceLoading || !isEmpty(addServiceSuccessMessage)}
          />
        </Grid>
        <Grid item>
          <GButton
            children={"Add"}
            className={classes.addButton}
            variant="outlined"
            onClick={handleAddService}
            disabled={addServiceLoading || !isEmpty(addServiceSuccessMessage)}
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
