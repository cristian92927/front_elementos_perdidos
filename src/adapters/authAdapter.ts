import { LoginRequest } from "../services/authService";

/**
 * Adapta el formato de datos del formulario al formato requerido por la API
 */
export const authAdapter = {
  /**
   * Convierte los datos del formulario de login al formato requerido por la API
   */
  toLoginRequest(formData: {
    username: string;
    password: string;
  }): LoginRequest {
    return {
      usuario: formData.username, // Asegúrate de que coincida con lo que espera el backend
      contraseña: formData.password, // Contraseña en texto plano que será procesada por el backend
    };
  },

  /**
   * Convierte el token de actualización al formato requerido por la API
   */
  toRevokeTokenRequest(refreshToken: string): { RefreshToken: string } {
    return {
      RefreshToken: refreshToken,
    };
  },
};
