import React from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { Routes, Route } from "react-router-dom";

import { AppDrawer } from "components";
import {
  AboutPage,
  ProviderPage,
  SignInPage,
  ContactsPage,
  SignupPage,
  EditProfilePage,
} from "pages";
import { AppProvider } from "store";
import {
  ABOUT,
  CONTACTS,
  EDIT_PROFILE,
  SIGN_IN,
  SIGN_UP,
} from "utils/constants";

function App() {
  const theme = createTheme();

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <AppDrawer>
          <Routes>
            <Route path="/" element={<ProviderPage />} />

            <Route
              path={`${encodeURI(ABOUT.toLowerCase())}`}
              element={<AboutPage />}
            />

            <Route
              path={`${encodeURI(CONTACTS.toLowerCase())}`}
              element={<ContactsPage />}
            />

            <Route
              path={`${encodeURI(SIGN_IN.toLowerCase())}`}
              element={<SignInPage />}
            />

            <Route
              path={`${encodeURI(SIGN_UP.toLowerCase())}`}
              element={<SignupPage />}
            />

            <Route
              path={`${encodeURI(EDIT_PROFILE.toLowerCase())}`}
              element={<EditProfilePage />}
            />
          </Routes>
        </AppDrawer>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
