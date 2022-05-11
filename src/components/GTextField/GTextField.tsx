import React, { FC } from "react";
import { TextField } from "@mui/material";

import { useStyles } from "./styles";
import { IGTextFieldProps } from "./types";

export const GTextField: FC<IGTextFieldProps> = ({
  id,
  className,
  label,
  type = "text",
  variant = "outlined",
  fullWidth = true,
  setText = () => {},
  textValue = "",
  multiline = false,
  rows = 1,
}) => {
  const classes = useStyles();

  /**
   *
   * Handlers
   *
   */
  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setText(e.currentTarget.value);
  };
  return (
    <TextField
      className={`${classes.textField} ${className}`}
      id={id}
      label={label}
      variant={variant}
      type={type}
      fullWidth={fullWidth}
      onChange={handleTextChange}
      value={textValue}
      multiline={multiline}
      rows={rows}
    />
  );
};
