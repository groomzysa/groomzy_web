import React, { FC } from "react";
import { Divider, Grid, Typography } from "@mui/material";

import { useStyles } from "./styles";

export const AboutPage: FC = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={0} md={2} lg={3}></Grid>
      <Grid item xs={12} md={8} lg={6}>
        <Grid container direction="column">
          <Grid item className={classes.heading}>
            Background
          </Grid>
          <Grid item>
            <Typography>
              Groomzy is a concept that was born in times of the 2020 COVID 19
              Global pandemic in response to offer
            </Typography>
            <Typography>
              convenient, transparent, flexible and reliable business operations
              platform for the beauty grooming industry.
            </Typography>
          </Grid>
          <Divider className={classes.padBottom10} />
          <Grid item className={classes.heading}>
            About
          </Grid>
          <Grid item>
            <Typography>
              Groomzy is a beauty grooming industry booking platform where
              service providers offer their services and the clients make
              bookings for these services.
            </Typography>
            <Typography>
              Both users (clients and service providers) can download the app to
              find service providers in their location.
            </Typography>
            <Typography className={classes.padBottom10}>
              It is an Any time, Anywhere platform that has an in-house booking
              feature, and makes scheduling and managing bookings much easier.
            </Typography>
            <Typography
              className={`${classes.padBottom10} ${classes.subHeading}`}
            >
              No more waiting for 9am to call and book your appointment.
            </Typography>
            <Typography
              className={`${classes.padBottom10} ${classes.subHeading}`}
            >
              No more engaged phones.
            </Typography>
            <Typography className={classes.padBottom10}>
              To get started, download groomzy application platform, select
              service type, search for a service provider, choose a service and
              make a booking within your area. Booking is easy, convenient and
              instant.
            </Typography>
          </Grid>
          <Divider className={classes.padBottom10} />
          <Grid item className={classes.heading}>
            Values and Missions
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography className={classes.subHeading}>
                      Convenience
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      We promise to offer easy, convenient and instant booking.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography className={classes.subHeading}>
                      Transparency
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      We promise to always put Groomzy clients’s interests
                      first.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography className={classes.subHeading}>
                      Flexibility
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      We promise to provide flexible and reliable service.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography className={classes.subHeading}>
                      Reliability
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      To build trust and confidence between Groomzy and clients
                      by offering excellent and reliable service.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} md={2} lg={3}></Grid>
    </Grid>
  );
};
