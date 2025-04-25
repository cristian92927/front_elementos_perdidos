import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useThemeMode = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useThemeMode debe ser usado dentro de un ThemeProvider");
  }

  return context;
};
