import api from "./api";
import { Sede, SedeCreate } from "../types/sede";
import { ApiResponse } from "../types/api";

export const sedeService = {
  /**
   * Obtiene todas las sedes
   */
  getAllSedes: async (): Promise<Sede[]> => {
    const response = await api.get<Sede[]>("/MaestroSedes");
    return response.data;
  },

  /**
   * Obtiene una sede por su ID
   */
  getSedeById: async (id: number): Promise<Sede> => {
    const response = await api.get<Sede>(`/MaestroSedes/${id}`);
    return response.data;
  },

  /**
   * Crea una nueva sede
   */
  createSede: async (sede: SedeCreate): Promise<ApiResponse<Sede>> => {
    const response = await api.post<ApiResponse<Sede>>("/MaestroSedes", sede);
    return response.data;
  },

  /**
   * Actualiza una sede existente
   */
  updateSede: async (
    id: number,
    sede: SedeCreate
  ): Promise<ApiResponse<Sede>> => {
    const response = await api.put<ApiResponse<Sede>>(
      `/MaestroSedes/${id}`,
      sede
    );
    return response.data;
  },
};
