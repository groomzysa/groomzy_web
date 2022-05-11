import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { useStyles } from "./styles";
import { IDrawerItemProps } from "./types";

export const DrawerItem: FC<IDrawerItemProps> = ({
  text,
  open,
  pathTo,
  icon,
  replace = false,
  onClick = () => {},
}) => {
  const classes = useStyles();
  return (
    <Link
      className={classes.link}
      to={pathTo}
      replace={replace}
      onClick={onClick}
    >
      <ListItemButton
        key={text}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </Link>
  );
};
