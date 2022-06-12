import React, { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, DialogActions, Grid, Typography } from "@mui/material";
import { isEmpty } from "lodash";

import { useAddService } from "api/hooks/mutations";
import { CATEGORIES, DURATION_UNITS } from "utils/constants";
import { setLocalStorage } from "utils/localStorage";

import { GButton, GDialogBox, GSelect, GTextField } from "components";
import { ISelectOption } from "store/types";

import { useStyles } from "./styles";

export const AddService: FC = () => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>();
  const [description, setDescription] = useState<string>("");
  const [duration, setDuration] = useState<string>();
  const [durationUnit, setDurationUnit] = useState<ISelectOption>();
  const [category, setCategory] = useState<ISelectOption>();
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
  } = useAddService({
    variables: {
      category: category?.value || "",
      title,
      description,
      price: Number(price),
      duration: Number(duration),
      durationUnit: durationUnit?.value || "",
      inHouse: false,
    },
  });

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
    if (
      !title ||
      !category ||
      !description ||
      !price ||
      !duration ||
      !durationUnit
    )
      return;
    addServiceMutate();
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
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <GTextField
          id="title"
          label="Title"
          textValue={title}
          setText={setTitle}
          disabled={addServiceLoading}
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
        />
      </Grid>
      <Grid className={classes.padTop10} item>
        <GTextField
          id="price"
          label="Price"
          textValue={price}
          setText={setPrice}
          disabled={addServiceLoading}
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
