import React, { FC } from "react";
import { Chip, Grid } from "@mui/material";
import { Category } from "store/types";

import { useStyles } from "./styles";
import { IGCategoryChipProps } from "./types";

export const GCategoryChip: FC<IGCategoryChipProps> = ({
  category,
  className,
  size = "small",
}) => {
  const classes = useStyles();

  /**
   *
   * Templates
   *
   */
  const chip = (category: Category, chipClassName: string) => (
    <Grid item className={className}>
      <Chip label={category} className={chipClassName} size={size} />
    </Grid>
  );

  const categoryChip = () => {
    switch (category) {
      case Category.Barber:
        return chip(category, classes.baberChip);

      case Category.MakeupArtist:
        return chip(category, classes.makeupArtistChip);

      case Category.Hairdresser:
        return chip(category, classes.hairdresserChip);

      case Category.NailTechnician:
        return chip(category, classes.nailTechinicianChip);

      case Category.Spa:
        return chip(category, classes.spaChip);

      default:
        return null;
    }
  };
  return categoryChip();
};
