import React, { FC } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const popupState = usePopupState({
    variant: "popper",
    popupId: "gallery-actions",
  });

  const classes = useStyles();

  /**
   *
   * Handlers
   *
   */
  const handleCreateTabIndexSearchParam = () => {
    return createSearchParams({
      tabIndex: searchParams.get("tabIndex")?.toString() || "1",
    }).toString();
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Tooltip title={`Actions for ${params.row.day}`} placement="top-start">
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
            onClick={() =>
              navigate({
                pathname: encodeURI(`view_operating_time/${params.row.id}`),
                search: handleCreateTabIndexSearchParam(),
              })
            }
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
            onClick={() =>
              navigate({
                pathname: encodeURI(`edit_operating_time/${params.row.id}`),
                search: handleCreateTabIndexSearchParam(),
              })
            }
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
              navigate({
                pathname: encodeURI(`delete_operating_time/${params.row.id}`),
                search: handleCreateTabIndexSearchParam(),
              })
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
