import React, { FC, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
} from "@mui/material";
import {
  TimelapseOutlined,
  GroupAddOutlined,
  BusinessCenterOutlined,
  PublicOutlined,
} from "@mui/icons-material";
import { getUserIdAndRole } from "utils/auth";

import { Role } from "store/types";

import {
  OperatingTimes,
  Services,
  Staffs,
  BusinessProfile,
} from "./components";
import { useStyles } from "./styles";

export const ProviderPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const tabIndex = searchParams.get("tabIndex");

  /**
   *
   * Custom hooks
   *
   */
  const classes = useStyles();
  const { role } = getUserIdAndRole();

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    if (role !== Role.Provider) {
      navigate(encodeURI("/"));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

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
      {Number(tabIndex) === 1 ? <OperatingTimes /> : null}
      {Number(tabIndex) === 2 ? <Staffs /> : null}
      {Number(tabIndex) === 3 ? <BusinessProfile /> : null}

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
            label="Operating time"
            icon={<TimelapseOutlined />}
          />
          <BottomNavigationAction
            className={classes.bottomNavigationAction}
            label="Staff"
            icon={<GroupAddOutlined />}
          />
          <BottomNavigationAction
            className={classes.bottomNavigationAction}
            label="Business profile"
            icon={<PublicOutlined />}
          />
        </BottomNavigation>
      </Paper>
    </Grid>
  );
};
