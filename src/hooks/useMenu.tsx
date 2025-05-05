import { useContext } from "react";
import { MenuContext } from "../context/MenuContext";

export const useMenu = () => {
  const context = useContext(MenuContext);

  if (context === undefined) {
    throw new Error("useMenu debe ser usado dentro de un MenuProvider");
  }

  return context;
};
