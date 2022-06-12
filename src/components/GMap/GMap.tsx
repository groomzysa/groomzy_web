import React, { FC } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

import { Map } from "./components";
import { MAP_ZOOM, SA_LAT_LNG } from "./constants";
import { useStyles } from "./styles";

export const GMap: FC<{
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  className?: string;
  markerLabel: string;
}> = ({ center = SA_LAT_LNG, zoom = MAP_ZOOM, className, markerLabel }) => {
  const classes = useStyles();

  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_API_KEY || ""}>
      <Map
        center={center}
        zoom={zoom}
        className={className ? className : classes.map}
        markerLabel={markerLabel}
      />
    </Wrapper>
  );
};
