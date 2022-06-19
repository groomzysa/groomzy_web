import React, { FC } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import { useStyles } from "./styles";
import { IGCheckBoxProps } from "./types";

export const GCheckBox: FC<IGCheckBoxProps> = ({
  checked,
  label = null,
  onClick = () => {},
  disabled = false,
}) => {
  const classes = useStyles();
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onClick={onClick}
            className={classes.checkBox}
            disabled={disabled}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};
