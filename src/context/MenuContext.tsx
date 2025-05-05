import React, { createContext, useState, useEffect, ReactNode } from "react";
import { menuService, MenuOption } from "../services/menuService";
import { useAuth } from "../hooks/useAuth";

interface MenuContextType {
  menuOptions: MenuOption[];
  isLoading: boolean;
  error: string | null;
  refreshMenu: () => Promise<void>;
}

export const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const loadMenu = async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);

    try {
      const menu = await menuService.getUserMenu();
      setMenuOptions(menu);
    } catch (err) {
      console.error("Error al cargar el menú:", err);
      setError("No se pudo cargar el menú. Por favor, intente nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, [isAuthenticated]);

  const refreshMenu = async () => {
    await loadMenu();
  };

  return (
    <MenuContext.Provider
      value={{ menuOptions, isLoading, error, refreshMenu }}
    >
      {children}
    </MenuContext.Provider>
  );
};
