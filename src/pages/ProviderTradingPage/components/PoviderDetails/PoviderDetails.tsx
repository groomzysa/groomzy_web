import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { Grid, Box, Divider } from "@mui/material";

import {
  useFetchProviderOperatingTimes,
  useFetchProviderProfile,
} from "api/hooks/queries";
import { GCenterMessage, GLoadingSpinner, GMap } from "components";

import { useStyles } from "./styles";

export const PoviderDetails: FC = () => {
  const { id } = useParams();
  const classes = useStyles();
  /**
   *
   * Custom hooks
   *
   */
  const { providerProfile, isLoading } = useFetchProviderProfile({
    variables: { providerId: Number(id) },
  });

  const { providerOperatingTimes, isLoading: operatingTimesLoading } =
    useFetchProviderOperatingTimes({ variables: { providerId: Number(id) } });

  if (isLoading || operatingTimesLoading) {
    return <GLoadingSpinner />;
  }

  if (!providerProfile) {
    return <GCenterMessage message="Provider details not yet available." />;
  }

  return (
    <Grid container direction="column">
      {providerProfile.tradingLatitude && providerProfile.tradingLongitude && (
        <Grid className={classes.mapWrapper} item>
          <GMap
            center={{
              lat: providerProfile.tradingLatitude,
              lng: providerProfile.tradingLongitude,
            }}
            zoom={13}
            markerLabel={providerProfile.tradingName || ""}
          />
        </Grid>
      )}
      {providerOperatingTimes && (
        <Grid item>
          <Box className={classes.operatingTitle}>Operating days and hours</Box>
          <Divider />
          {providerOperatingTimes.map((dayTime) => {
            const { day, time } = dayTime;
            return (
              <Grid
                className={classes.dayTimes}
                key={day?.day}
                container
                justifyContent="space-evenly"
              >
                <Grid item>{day?.day}</Grid>
                <Grid item>
                  <Grid container>
                    <Grid item>{`${time?.startTime} hrz`}</Grid>
                    <Grid className={classes.timeSeperator} item>
                      -
                    </Grid>
                    <Grid item>{`${time?.endTime} hrz`}</Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Grid>
  );
};
