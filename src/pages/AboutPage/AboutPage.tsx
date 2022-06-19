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
              Groomzy is a beauty grooming industry{" "}
              <strong>(future booking)</strong> platform where service providers
              offer their services and the clients make bookings for these
              services.
            </Typography>
            <br />
            <Typography>
              Currently, Groomzy offers its platform in 2 forms, namely, Web app
              which accessible through https://www.groomzy.co.za and an Android
              app where both users (clients and service providers) can download
              the app to find service providers in their near location or
              nationwide.
            </Typography>
            <br />
            <Typography className={classes.padBottom10}>
              Groomzy is an{" "}
              <strong>
                Any time, Anywhere platform that will enable an in-house booking
                feature, and makes scheduling and managing bookings much easier.
              </strong>
            </Typography>
            <br />

            <Typography>
              <strong>Groomzy aims to:</strong>
            </Typography>

            <Typography
              className={`${classes.padBottom10} ${classes.subHeading}`}
            >
              No more waiting for 9am to call and book your appointment.
            </Typography>
            <Typography
              className={`${classes.padBottom10} ${classes.subHeading}`}
            >
              No more unneccessary long queues.
            </Typography>
            <Typography
              className={`${classes.padBottom10} ${classes.subHeading}`}
            >
              No more wasted waiting time.
            </Typography>
            <Typography
              className={`${classes.padBottom10} ${classes.subHeading}`}
            >
              Quick servicing of clients.
            </Typography>
            <Typography
              className={`${classes.padBottom10} ${classes.subHeading}`}
            >
              Easy clients management record.
            </Typography>
            <br />
            <Typography className={classes.padBottom10}>
              To get started, visit Groomzy at https://www.groomzy.co.za or
              download an android groomzy application here. As a{" "}
              <strong>client</strong> you may start browsing right-away and can
              view more details about a service provider by clicking the view
              button. As a <strong>service provider</strong>, you may start
              creating your profile right-away and once you have provided all
              your business details including (trading name, trading address,
              trading days and hours, and services) then you will appear to the
              clients search
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
                      We promise to offer easy to use and convenient grooming
                      search of service providers.
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
