import React, { FC } from "react";
import { useSearchParams } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
} from "@mui/material";
import {
  BusinessCenterOutlined,
  InfoOutlined,
  ImageOutlined,
} from "@mui/icons-material";

import { PoviderDetails, Services, Gallery } from "./components";

import { useStyles } from "./styles";

export const ProviderTradingPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabIndex = searchParams.get("tabIndex");

  /**
   *
   * Custom hooks
   *
   */
  const classes = useStyles();

  /**
   *
   * Handlers
   *
   */
  const handleTabIndexChange = (newTabIndex: number) => {
    setSearchParams({ tabIndex: String(newTabIndex) });
  };

  return (
    <Grid>
      {Number(tabIndex) === 0 ? <Services /> : null}
      {Number(tabIndex) === 1 ? <PoviderDetails /> : null}
      {Number(tabIndex) === 2 ? <Gallery /> : null}

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={Number(tabIndex)}
          onChange={(event, newTabIndex) => {
            handleTabIndexChange(newTabIndex);
          }}
        >
          <BottomNavigationAction
            className={classes.bottomNavigationAction}
            label="Services"
            icon={<BusinessCenterOutlined />}
          />
          <BottomNavigationAction
            className={classes.bottomNavigationAction}
            label="Details"
            icon={<InfoOutlined />}
          />
          <BottomNavigationAction
            className={classes.bottomNavigationAction}
            label="Gallery"
            icon={<ImageOutlined />}
          />
        </BottomNavigation>
      </Paper>
    </Grid>
  );
};
