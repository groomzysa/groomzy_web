import React from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";

import { AppDrawer, AppRoutes } from "components";
import { AppProvider } from "store";

function App() {
  const theme = createTheme();

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <AppDrawer>
          <AppRoutes />
        </AppDrawer>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
