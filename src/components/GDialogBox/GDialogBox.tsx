import React, { FC } from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

import { GLoadingSpinner } from "components/GLoadingSpinner";

import { IGDialogBoxProps } from "./types";

export const GDialogBox: FC<IGDialogBoxProps> = ({
  handleClose,
  tittleComponent,
  footerComponent,
  children,
  maxWidth,
  loading = false,
}) => {
  /**
   *
   * Templates
   *
   */
  const dialogTittle = (
    <DialogTitle>
      {tittleComponent}
      {handleClose ? (
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          disableRipple
        >
          <CloseOutlined />
        </IconButton>
      ) : null}
    </DialogTitle>
  );

  return (
    <Dialog
      fullWidth
      onClose={handleClose}
      open
      disableEnforceFocus
      maxWidth={maxWidth}
    >
      {dialogTittle}
      {loading ? (
        <GLoadingSpinner />
      ) : (
        <DialogContent dividers>{children}</DialogContent>
      )}
      {footerComponent ? (
        <DialogActions>{footerComponent}</DialogActions>
      ) : null}
    </Dialog>
  );
};
