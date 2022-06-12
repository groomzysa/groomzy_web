import {
  Dispatch,
  HTMLInputTypeAttribute,
  ReactNode,
  SetStateAction,
} from "react";

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
  disabled?: boolean;
  children?: any;
  isSelect?: boolean;
  startIcon?: ReactNode;
  placeholder?: string;
  errorMessage?: string;
}
