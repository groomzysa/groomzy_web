import React, { FC } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

import { GButtonProps } from "./types";
import { useStyles } from "./styles";

export const GButton: FC<GButtonProps> = ({
  className,
  text,
  onClick,
  loading = false,
}) => {
  const classes = useStyles();
  return (
    <LoadingButton
      variant="contained"
      className={`${classes.button} ${className}`}
      onClick={onClick}
      disableRipple
      disableElevation
      loading={loading}
      loadingIndicator="Loading..."
    >
      {text}
    </LoadingButton>
  );
};
