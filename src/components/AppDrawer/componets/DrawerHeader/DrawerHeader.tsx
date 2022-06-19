import React, { FC } from "react";
import { Grid, Box, IconButton, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import { GTextOverflow } from "components";
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
                <Avatar
                  key={`${new Date()}`}
                  alt={signedInUser?.fullName || "Profile placeholder"}
                  src={signedInUser?.profileImageUrl as string}
                  className={classes.avatar}
                />
              </Grid>
              {signedInUser?.fullName ? (
                <Grid item className={classes.name}>
                  <GTextOverflow
                    id="signed-in-user-drawer-header"
                    title={signedInUser.fullName}
                  />
                </Grid>
              ) : null}
            </Grid>
          </Box>
        ) : null}
      </Grid>
      <Grid item>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRight className={classes.white} />
          ) : (
            <ChevronLeft className={classes.white} />
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
};
