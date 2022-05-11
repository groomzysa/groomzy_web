import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";

export interface IGTextFieldProps {
  type?: HTMLInputTypeAttribute;
  className?: string;
  id: string;
  label: string;
  variant?: "outlined" | "standard" | "filled" | undefined;
  fullWidth?: boolean;
  setText?: Dispatch<SetStateAction<string>> | ((text: string) => void);
  textValue?: string;
  multiline?: boolean;
  rows?: number;
}
