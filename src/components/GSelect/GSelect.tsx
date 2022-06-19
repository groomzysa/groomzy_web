import React, { FC } from "react";
import { MenuItem } from "@mui/material";

import { GTextField } from "components/GTextField";

import { IGSelectProps } from "./types";

export const GSelect: FC<IGSelectProps> = ({
  options,
  id,
  selectLabel,
  setSelect,
  value,
  disabled = false,
  placeholder = "",
  errorMessage = "",
  resetErrorMessage = () => {},
}) => {
  /**
   *
   * Handlers
   *
   */
  const handleChange = (value: string) => {
    const selectedOption = options.find((option) => option.value === value);
    if (!selectedOption) return;

    setSelect(selectedOption.value === "None" ? undefined : selectedOption);
  };

  return (
    <GTextField
      id={`${id}-select-input`}
      label={selectLabel}
      isSelect={true}
      setText={handleChange}
      textValue={value?.value || ""}
      disabled={disabled}
      errorMessage={errorMessage}
      resetErrorMessage={resetErrorMessage}
      placeholder={placeholder}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </GTextField>
  );
};
