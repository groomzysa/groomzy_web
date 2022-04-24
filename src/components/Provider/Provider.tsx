import React, { FC, useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { LocationOnOutlined } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
import { IProviderProps } from "./types";
import { useProviderHandlers } from "./hooks";
import { Box } from "@mui/system";
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
            {loadingDistance ? <CircularProgress size={20} /> : distance}
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
