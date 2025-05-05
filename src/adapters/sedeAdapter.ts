import { Sede, SedeCreate } from "../types/sede";

export const sedeAdapter = {
  /**
   * Convierte los datos del formulario al formato requerido por la API
   */
  toApiFormat(formData: { nombreSede: string; estado?: boolean }): SedeCreate {
    return {
      nombreSede: formData.nombreSede,
      estado: formData.estado ?? true, // Valor por defecto si no se proporciona
    };
  },

  /**
   * Convierte los datos de la API al formato del formulario
   */
  toFormData(sede: Sede): {
    nombreSede: string;
    estado: boolean;
  } {
    return {
      nombreSede: sede.nombreSede,
      estado: sede.estado,
    };
  },
};
