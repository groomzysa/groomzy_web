import React, { FC, useEffect, useMemo, useState } from "react";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Grid,
  Divider,
  Avatar,
  CardActions,
} from "@mui/material";
import { uniq } from "lodash";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";

import { LocationOnOutlined, VisibilityOutlined } from "@mui/icons-material";

import { GCategoryChip, GLoadingSpinner, GTextOverflow } from "components";
import { GButton } from "components/GButton";
import { PROVIDER_TRADING } from "utils/constants";
import { Address, ProviderProfile } from "api/generated/schema";

import { IProviderProps } from "./types";
import { useProviderHandlers } from "./hooks";
import { useStyles } from "./styles";

export const Provider: FC<IProviderProps> = ({
  provider: {
    id,
    fullName,
    profileImageUrl,
    address,
    profile,
    gallery,
    serviceProviderCategories,
  },
}) => {
  const [distance, setDistance] = useState<string>("");
  const [loadingDistance, setLoadingDistance] = useState<boolean>(false);
  const navigate = useNavigate();

  const classes = useStyles();
  const hasCoordinates =
    (profile?.tradingLatitude && profile.tradingLongitude) ||
    (address?.latitude && address?.longitude);
  const categories = uniq(
    serviceProviderCategories?.map(({ category }) => category!.category) || []
  );
  /**
   *
   * Custom hooks
   *
   */
  const { handleAddress, handleDistance } = useProviderHandlers({
    address: address as Address,
    profile: profile as ProviderProfile | undefined,
    setDistance,
    setLoadingDistance,
  });

  /**
   *
   * Callbacks
   *
   */
  const getDistance = useMemo(
    () => handleDistance,

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    getDistance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   *
   * Handlers
   *
   */
  const handleToProviderServices = (id: number) => {
    navigate(encodeURI(`${PROVIDER_TRADING.toLowerCase()}/${id}?tabIndex=0`));
  };

  /**
   *
   * Templates
   *
   */
  const categoryChips = categories?.map((category) => {
    return (
      <GCategoryChip
        key={category}
        category={category}
        className={classes.chipCaontainer}
      />
    );
  });

  return (
    <Card className={classes.wrapper}>
      <CardHeader
        avatar={
          <Avatar
            alt={fullName || "Profile placeholder"}
            src={(profile?.tradingProfileImageUrl || profileImageUrl) as string}
            className={classes.avatar}
          />
        }
        title={<Typography>{profile?.tradingName || fullName}</Typography>}
      />

      <CardContent className={classes.cardContent}>
        <Grid container direction="column">
          <Grid item className={classes.carousel}>
            <Carousel
              height={220}
              indicatorContainerProps={{
                style: {
                  position: "relative",
                  top: -30,
                  zIndex: 1,
                },
              }}
            >
              {(
                gallery || [
                  { id: 0, name: "Placeholder image", url: "/placeholder.png" },
                ]
              ).map((image) => (
                <img
                  key={image.id}
                  src={image.url}
                  className={classes.carouselImg}
                  alt={image.name}
                />
              ))}
            </Carousel>
          </Grid>
          <Grid item className={classes.categories}>
            {categoryChips}
          </Grid>
          <Grid item>
            <Divider light variant="middle" />
          </Grid>
          <GTextOverflow
            title={handleAddress() || ""}
            id={id.toString()}
            classname={classes.address}
          />
        </Grid>
      </CardContent>
      <CardActions disableSpacing className={classes.actions}>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <IconButton
                className={`${!hasCoordinates ? classes.noPointer : ""} ${
                  classes.locationIcon
                }`}
                onClick={() => {
                  if (!hasCoordinates) return;
                  window.open(
                    `https://maps.google.com/?q=${
                      profile?.tradingLatitude || address?.latitude
                    },${profile?.tradingLongitude || address?.longitude}`
                  );
                }}
                disableRipple
              >
                <LocationOnOutlined />
              </IconButton>
            </Grid>
            <Grid item className={classes.locationDistance}>
              {loadingDistance ? <GLoadingSpinner size={18} /> : distance}
            </Grid>
          </Grid>
        </Grid>
        <GButton
          children={
            <Grid container alignItems="center">
              <VisibilityOutlined /> View
            </Grid>
          }
          variant="outlined"
          className={classes.button}
          onClick={() => handleToProviderServices(id)}
        />
      </CardActions>
    </Card>
  );
};
