import React, { FC } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { isEmpty } from "lodash";

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
  disabled = false,
  children,
  isSelect,
  startIcon,
  placeholder,
  errorMessage = "",
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
    setText(e?.currentTarget?.value || e.target.value);
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
      disabled={disabled}
      select={isSelect}
      InputProps={{
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : null,
      }}
      placeholder={placeholder}
      error={!isEmpty(errorMessage)}
      helperText={errorMessage}
    >
      {children}
    </TextField>
  );
};
