import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { MenuProvider } from "./context/MenuContext";
import { useThemeMode } from "./hooks/useThemeMode";
import { createAppTheme } from "./theme";
import AppRoutes from "./routes";

// Componente envoltorio para aplicar el tema de Material UI
const ThemedApp = () => {
  const { mode } = useThemeMode();
  const theme = createAppTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline /> {/* Normaliza los estilos base */}
      <BrowserRouter>
        <AuthProvider>
          <MenuProvider>
            <AppRoutes />
          </MenuProvider>
        </AuthProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
};

export default App;
