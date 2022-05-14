import React, { FC, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  CardContent,
  Typography,
  Grid,
  Divider,
  Avatar,
} from "@mui/material";
import { uniq } from "lodash";

import { LocationOnOutlined, FavoriteOutlined } from "@mui/icons-material";

import { GLoadingSpinner } from "components";
import { Category } from "store/types";

import { CategoryChip } from "./components";
import { IProviderProps } from "./types";
import { useProviderHandlers } from "./hooks";
import { useStyles } from "./styles";

export const Provider: FC<IProviderProps> = ({
  provider: { fullName, address, serviceProviderCategories },
}) => {
  const [distance, setDistance] = useState<string>("");
  const [loadingDistance, setLoadingDistance] = useState<boolean>(false);
  const { handleAddress, handleDistance } = useProviderHandlers({
    address,
    setDistance,
    setLoadingDistance,
  });
  const classes = useStyles();
  const hasCoordinates = address?.latitude && address?.longitude;
  const categories = uniq(
    serviceProviderCategories?.map(
      (serviceProviderCategory) => serviceProviderCategory.category.category
    ) || []
  );
  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    handleDistance();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   *
   * Templates
   *
   */
  const categoryChips = categories.map((category) => {
    switch (category) {
      case Category.Barber:
        return (
          <CategoryChip
            key={category}
            category={category}
            chipClassName={classes.baberChip}
            className={classes.chipCaontainer}
            size="small"
          />
        );
      case Category.MakeupArtist:
        return (
          <CategoryChip
            key={category}
            category={category}
            chipClassName={classes.makeupArtistChip}
            className={classes.chipCaontainer}
            size="small"
          />
        );
      case Category.Hairdresser:
        return (
          <CategoryChip
            key={category}
            category={category}
            chipClassName={classes.hairdresserChip}
            className={classes.chipCaontainer}
            size="small"
          />
        );
      case Category.NailTechnician:
        return (
          <CategoryChip
            key={category}
            category={category}
            chipClassName={classes.nailTechinicianChip}
            className={classes.chipCaontainer}
            size="small"
          />
        );
      case Category.Spa:
        return (
          <CategoryChip
            key={category}
            category={category}
            chipClassName={classes.spaChip}
            className={classes.chipCaontainer}
            size="small"
          />
        );
      default:
        return null;
    }
  });

  return (
    <Card sx={{ minHeight: 300 }}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            <span className={classes.avatarText}>{fullName?.[0] || ""}</span>
          </Avatar>
        }
        title={<Typography>{fullName}</Typography>}
        subheader={<Grid container>{categoryChips}</Grid>}
      />
      <CardMedia
        component="img"
        height="230"
        image="/placeholder.png"
        alt="Image"
      />
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item xs>
            <Grid container direction="column">
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
                          `https://maps.google.com/?q=${address.latitude},${address.longitude}`
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
              <Grid item>
                <Divider light variant="middle" />
              </Grid>
              <Grid item xs>
                <Grid container>
                  <Grid item>{handleAddress()}</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton
              className={classes.favIcon}
              onClick={() => {}}
              disableRipple
            >
              <FavoriteOutlined />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions> */}
    </Card>
  );
};
