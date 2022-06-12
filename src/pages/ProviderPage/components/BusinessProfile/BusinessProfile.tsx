import React, { FC, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { Gallery, Profile, Socials } from "./components";
import { useStyles } from "./styles";

export const BusinessProfile: FC = () => {
  const [value, setValue] = useState<string>("profile");
  const classes = useStyles();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList className={classes.tabList} onChange={handleChange}>
            <Tab className={classes.tab} label="Profile" value="profile" />
            <Tab className={classes.tab} label="Socials" value="socials" />
            <Tab className={classes.tab} label="Gallery" value="gallery" />
          </TabList>
        </Box>
        <TabPanel value="profile">
          <Profile />
        </TabPanel>
        <TabPanel value="socials">
          <Socials />
        </TabPanel>
        <TabPanel value="gallery">
          <Gallery />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
