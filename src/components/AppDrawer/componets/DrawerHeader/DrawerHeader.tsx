import React, { FC } from "react";
import { Grid, Box, IconButton } from "@mui/material";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";

import { IDrawerHeaderProps } from "./types";
import { ChevronLeft, ChevronRight, PersonRounded } from "@mui/icons-material";
import { useStyles } from "./styles";

export const DrawerHeader: FC<IDrawerHeaderProps> = ({
  handleDrawerClose,
  open,
}) => {
  const theme = useTheme();
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
            <Grid container direction="column">
              <Grid item>
                <PersonRounded />
              </Grid>
              {/* {fullName ? <Grid item>{fullName}</Grid> : null}
                {email ? <Grid item>{email}</Grid> : null} */}
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
