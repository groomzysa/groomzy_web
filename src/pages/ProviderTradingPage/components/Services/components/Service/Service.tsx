import React, { FC } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";

import { GCategoryChip } from "components";

import { IServiceProps } from "./types";
import { useStyles } from "./styles";

export const Service: FC<IServiceProps> = ({
  service,
  category,
  className = "",
}) => {
  const classes = useStyles();

  return (
    <Grid className={className}>
      <Card>
        <CardHeader
          title={
            <Grid item className={classes.title}>
              {service.title}
            </Grid>
          }
          action={
            <Grid item className={classes.price}>{`R${service.price}`}</Grid>
          }
        />
        <CardContent className={classes.cardContent}>
          <Grid container direction="column">
            <Grid item className={classes.description}>
              {service.description}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container>
            <Grid item>
              <GCategoryChip category={category.category} />
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>{`${service.duration} ${service.durationUnit}`}</Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};
