import api from "./api";

export interface MenuOption {
  id: number;
  name: string;
  route: string;
  icon: string;
  order: number;
  isEnabled: boolean;
  parentId: number | null;
  subOptions: MenuOption[];
  roles: string[];
}

export const menuService = {
  /**
   * Obtiene el menú filtrado según el rol del usuario
   */
  getUserMenu: async (): Promise<MenuOption[]> => {
    const response = await api.get("/menu");
    return response.data;
  },

  /**
   * Obtiene todas las opciones de menú (solo admin)
   */
  getAllMenuOptions: async (): Promise<MenuOption[]> => {
    const response = await api.get("/menu/all");
    return response.data;
  },

  /**
   * Habilita/deshabilita una opción de menú
   */
  toggleMenuOption: async (id: number): Promise<MenuOption> => {
    const response = await api.put(`/menu/${id}/toggle`);
    return response.data;
  },
};
