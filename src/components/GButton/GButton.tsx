import React, { FC } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

import { GButtonProps } from "./types";

export const GButton: FC<GButtonProps> = ({
  className,
  children,
  onClick,
  loading = false,
  variant = "contained",
  startIcon,
  size,
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <LoadingButton
      variant={variant}
      className={className}
      onClick={onClick}
      disableRipple
      disableElevation
      loading={loading}
      loadingIndicator="Loading..."
      startIcon={startIcon}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {children}
    </LoadingButton>
  );
};
