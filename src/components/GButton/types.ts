import { ReactNode } from "react";

export interface GButtonProps {
  className?: string;
  onClick?: () => void;
  children: string | ReactNode;
  loading?: boolean;
  variant?: "text" | "outlined" | "contained";
  startIcon?: ReactNode;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  fullWidth?: boolean;
}
