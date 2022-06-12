import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Menu, MenuItem, Tooltip } from "@mui/material";
import {
  VisibilityOutlined,
  DeleteOutlined,
  MoreVertOutlined,
  EditOutlined,
} from "@mui/icons-material";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";

import { INamedActionsCellRendererProps } from "./types";
import { useStyles } from "./styles";

export const NamedActionsCellRenderer: FC<INamedActionsCellRendererProps> = ({
  params,
}) => {
  const navigate = useNavigate();
  const popupState = usePopupState({
    variant: "popper",
    popupId: "gallery-actions",
  });

  const classes = useStyles();

  return (
    <>
      <Grid container justifyContent="center">
        <Tooltip
          title={`Actions for ${params.row.title}`}
          placement="top-start"
        >
          <MoreVertOutlined
            className={classes.actionsIcon}
            {...bindTrigger(popupState)}
          />
        </Tooltip>
      </Grid>
      <Menu className={classes.menuItem} {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>
          <Grid
            className={classes.viewAction}
            container
            justifyContent="space-between"
            onClick={() => navigate(encodeURI(`view_service/${params.row.id}`))}
          >
            <Grid item>View</Grid>
            <Grid item>
              <VisibilityOutlined />
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem onClick={popupState.close}>
          <Grid
            className={classes.editAction}
            container
            justifyContent="space-between"
            onClick={() => navigate(encodeURI(`edit_service/${params.row.id}`))}
          >
            <Grid item>Edit</Grid>
            <Grid item>
              <EditOutlined />
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem onClick={popupState.close}>
          <Grid
            className={classes.deleteAction}
            container
            justifyContent="space-between"
            onClick={() =>
              navigate(
                encodeURI(
                  `delete_service/${params.row.id}/${params.row.serviceProviderCategories[0].category.id}`
                )
              )
            }
          >
            <Grid item>Delete</Grid>
            <Grid item>
              <DeleteOutlined />
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>
    </>
  );
};
