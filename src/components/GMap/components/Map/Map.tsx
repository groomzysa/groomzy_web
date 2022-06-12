import React, { FC, useRef, useEffect, useState } from "react";

export const Map: FC<{
  id?: string;
  center: google.maps.LatLngLiteral;
  zoom: number;
  className: string;
  markerLabel: string;
}> = ({ id = "map", center, zoom, className, markerLabel }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, map]);

  useEffect(() => {
    if (map) {
      map.setOptions({ center, zoom });
    }

    new window.google.maps.Marker({
      position: center,
      opacity: 0.5,
      title: markerLabel,
      map,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, center, markerLabel]);

  return <div className={className} ref={ref} id={id} />;
};
