import React from "react";
import { Container, createTheme } from "@mui/material";
import { AppProvider } from "store";
import { ProviderPage } from "pages";
import { AppDrawer } from "components";
import { ThemeProvider } from "@mui/styles";

function App() {
  const theme = createTheme();

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <AppDrawer>
          <ProviderPage />
        </AppDrawer>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
