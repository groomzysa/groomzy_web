import React, { FC } from "react";
import { Grid, Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ChevronLeft,
  ChevronRight,
  PersonOutlineRounded,
} from "@mui/icons-material";

import { useApp } from "store";
import { IDrawerHeaderProps } from "./types";
import { useStyles } from "./styles";

export const DrawerHeader: FC<IDrawerHeaderProps> = ({
  handleDrawerClose,
  open,
}) => {
  const theme = useTheme();

  /**
   *
   * Custom hooks
   *
   */
  const { signedInUser } = useApp();
  const classes = useStyles();

  return (
    <Grid
      className={classes.drawerHeader}
      container
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        {open ? (
          <Box marginLeft={2}>
            <Grid container alignItems="center">
              <Grid item>
                <PersonOutlineRounded />
              </Grid>
              {signedInUser?.fullName ? (
                <Grid item>{signedInUser.fullName}</Grid>
              ) : null}
            </Grid>
          </Box>
        ) : null}
      </Grid>
      <Grid item>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Grid>
    </Grid>
  );
};
