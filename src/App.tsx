import React from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { Routes, Route } from "react-router-dom";

import { AppDrawer } from "components";
import { AboutPage, ProviderPage, SignInPage, ContactsPage } from "pages";
import { AppProvider } from "store";
import { ABOUT, CONTACTS, SIGN_IN } from "utils/constants";

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
          </Routes>
        </AppDrawer>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
