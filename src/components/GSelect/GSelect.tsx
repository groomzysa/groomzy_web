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
}) => {
  /**
   *
   * Handlers
   *
   */
  const handleChange = (value: string) => {
    const selectedOption = options.find((option) => option.value === value);
    if (!selectedOption) return;
    setSelect(selectedOption);
  };

  return (
    <GTextField
      id={`${id}-select-input`}
      label={selectLabel}
      isSelect={true}
      setText={handleChange}
      textValue={value?.value || ""}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </GTextField>
  );
};
