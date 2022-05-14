import React, { FC } from "react";
import { Chip, Grid } from "@mui/material";

import { ICategoryChipProps } from "./types";

export const CategoryChip: FC<ICategoryChipProps> = ({
  category,
  className,
  chipClassName,
  size,
}) => {
  return (
    <Grid item className={className}>
      <Chip label={category} className={chipClassName} size={size} />
    </Grid>
  );
};
