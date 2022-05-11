import React, { FC, useEffect, useState } from "react";
import { Card, CardHeader, CardMedia, IconButton, Box } from "@mui/material";

import { LocationOnOutlined } from "@mui/icons-material";

import { GLoadingSpinner } from "components";

import { IProviderProps } from "./types";
import { useProviderHandlers } from "./hooks";
import { useStyles } from "./styles";

export const Provider: FC<IProviderProps> = ({
  provider: { fullName, address },
}) => {
  const [distance, setDistance] = useState<string>("");
  const [loadingDistance, setLoadingDistance] = useState<boolean>(false);
  const { handleAddress, handleDistance } = useProviderHandlers({
    address,
    setDistance,
    setLoadingDistance,
  });
  const classes = useStyles();
  const hasCoordinates = address?.latitude && address?.longitude;
  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    handleDistance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card sx={{ minHeight: 300, maxHeight: 300 }}>
      <CardHeader
        avatar={
          <IconButton
            className={`${!hasCoordinates ? classes.noPointer : ""}`}
            onClick={() => {
              if (!hasCoordinates) return;
              window.open(
                `https://maps.google.com/?q=${address.latitude},${address.longitude}`
              );
            }}
            disableRipple
          >
            <LocationOnOutlined />
          </IconButton>
        }
        action={
          <Box>
            {loadingDistance ? <GLoadingSpinner size={20} /> : distance}
          </Box>
        }
        title={fullName}
        subheader={handleAddress()}
      />
      <CardMedia
        component="img"
        height="230"
        image="/placeholder.png"
        alt="Image"
      />
      {/* TODO Add CardContent showing services categories for a provider as TAGs */}
    </Card>
  );
};
