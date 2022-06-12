import React, { FC, ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { styled, Theme, CSSObject } from "@mui/material/styles";
import {
  Box,
  List,
  Toolbar,
  Typography,
  Divider,
  CssBaseline,
  IconButton,
  Grid,
  ClickAwayListener,
} from "@mui/material";
import {
  ContactsOutlined,
  EditOutlined,
  HomeOutlined,
  InfoOutlined,
  LoginOutlined,
  LogoutOutlined,
  Menu,
  PersonAddOutlined,
  PolicyOutlined,
} from "@mui/icons-material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";

import {
  ABOUT,
  CONTACTS,
  EDIT_PROFILE,
  HOME,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  TS_AND_CS,
} from "utils/constants";
import { useFetchClient, useFetchProvider } from "api/hooks/queries";
import { getToken, getUserIdAndRole, setToken } from "utils/auth";
import { useApp } from "store";
import { Role } from "store/types";
import { Client, Provider } from "api/generated/graphqlTypes";

import { DrawerHeader, DrawerItem } from "./componets";
import { DRAWER_WIDTH } from "./constants";
import { IAppBarProps } from "./types";

export const AppDrawer: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [pagename, setPageName] = useState<string>("Home");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  /**
   *
   * Custom hooks
   *
   */
  const { signedInUser, setSignedInUser } = useApp();
  const { id, role } = getUserIdAndRole();
  const { client } = useFetchClient(getToken() || "", signedInUser as Client);
  const { provider } = useFetchProvider(
    getToken() || "",
    signedInUser as Provider
  );

  /**
   *
   * Effects
   *
   */
  useEffect(() => {
    handlePageName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!client && signedInUser) return;
    setSignedInUser(client);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  useEffect(() => {
    if (!provider && signedInUser) return;
    setSignedInUser(provider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  /**
   *
   * Handlers
   *
   */
  const handlePageName = () => {
    const currentUrlName = decodeURI(pathname).split("/")?.[1];
    switch (currentUrlName) {
      case ABOUT.toLowerCase():
        setPageName(ABOUT);
        break;
      case CONTACTS.toLowerCase():
        setPageName(CONTACTS);
        break;
      case SIGN_IN.toLowerCase():
        setPageName(SIGN_IN);
        break;
      case SIGN_UP.toLowerCase():
        setPageName(SIGN_UP);
        break;
      case SIGN_OUT.toLowerCase():
        setPageName(SIGN_OUT);
        break;
      case EDIT_PROFILE.toLowerCase():
        setPageName(EDIT_PROFILE);
        break;
      case TS_AND_CS.toLowerCase():
        setPageName(TS_AND_CS);
        break;
      default:
        setPageName(HOME);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOut = () => {
    navigate(encodeURI("/"), { replace: true });
    setToken("");
    setSignedInUser(undefined);
    handleDrawerClose();
  };

  /**
   *
   * Templates
   *
   */
  const openedMixin = (theme: Theme): CSSObject => ({
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<IAppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    zIndex: theme.zIndex.drawer - 1,
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ bgcolor: "#607D8B" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>
          <Grid container alignItems="baseline" justifyContent="space-between">
            <Grid item>
              <Typography variant="h6" noWrap component="div">
                Groomzy
              </Typography>
            </Grid>
            <Grid item>{pagename}</Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <ClickAwayListener onClickAway={open ? handleDrawerClose : () => {}}>
          <Grid>
            <DrawerHeader handleDrawerClose={handleDrawerClose} open={open} />
            <Divider />
            <List>
              <DrawerItem
                text={HOME}
                open={open}
                pathTo={
                  role === Role.Provider ? encodeURI(`/${id}`) : encodeURI("/")
                }
                icon={<HomeOutlined />}
                onClick={handleDrawerClose}
              />
              <DrawerItem
                text={ABOUT}
                open={open}
                pathTo={encodeURI(ABOUT.toLowerCase())}
                icon={<InfoOutlined />}
                onClick={handleDrawerClose}
              />
              <DrawerItem
                text={CONTACTS}
                open={open}
                pathTo={encodeURI(CONTACTS.toLowerCase())}
                icon={<ContactsOutlined />}
                onClick={handleDrawerClose}
              />
            </List>
            <Divider />
            <List>
              {signedInUser ? (
                <DrawerItem
                  text={EDIT_PROFILE}
                  open={open}
                  pathTo={encodeURI(EDIT_PROFILE.toLowerCase())}
                  icon={<EditOutlined />}
                  onClick={handleDrawerClose}
                />
              ) : null}
              {!signedInUser ? (
                <DrawerItem
                  text={SIGN_IN}
                  open={open}
                  pathTo={encodeURI(SIGN_IN.toLowerCase())}
                  icon={<LoginOutlined />}
                  onClick={handleDrawerClose}
                />
              ) : null}
              {!signedInUser ? (
                <DrawerItem
                  text={SIGN_UP}
                  open={open}
                  pathTo={encodeURI(SIGN_UP.toLowerCase())}
                  icon={<PersonAddOutlined />}
                  onClick={handleDrawerClose}
                />
              ) : null}
              {signedInUser ? (
                <DrawerItem
                  text={SIGN_OUT}
                  open={open}
                  pathTo={"/"}
                  replace={true}
                  icon={<LogoutOutlined />}
                  onClick={handleSignOut}
                  isLink={false}
                />
              ) : null}
            </List>
            <Divider />
            <List>
              <DrawerItem
                text={TS_AND_CS}
                open={open}
                pathTo={encodeURI(TS_AND_CS.toLowerCase())}
                icon={<PolicyOutlined />}
                onClick={handleDrawerClose}
              />
            </List>
          </Grid>
        </ClickAwayListener>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box marginTop={7}>{children}</Box>
      </Box>
    </Box>
  );
};
