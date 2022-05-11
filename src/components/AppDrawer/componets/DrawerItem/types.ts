import { ReactElement } from "react";

export interface IDrawerItemProps {
  text: string;
  open: boolean;
  pathTo: string;
  icon: ReactElement;
  replace?: boolean;
  onClick?: () => void;
}
