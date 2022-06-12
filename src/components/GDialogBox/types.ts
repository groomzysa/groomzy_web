import { ReactNode } from "react";
import { Breakpoint } from "@mui/material";

export interface IGDialogBoxProps {
  handleClose?: () => void;
  tittleComponent?: ReactNode;
  footerComponent?: ReactNode;
  children?: ReactNode;
  maxWidth?: Breakpoint;
  loading?: boolean;
}
