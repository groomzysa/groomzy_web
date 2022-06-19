import React from "react";
import { Box, createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";

import { AppDrawer, AppRoutes } from "components";
import { AppProvider } from "store";

function App() {
  const theme = createTheme();

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <AppDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box marginLeft={6} marginTop={6}>
            <AppRoutes />
          </Box>
        </Box>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
