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
      Usuario: formData.username,
      Contraseña: formData.password,
    };
  },

  toRevokeTokenRequest(refreshToken: string): { RefreshToken: string } {
    return {
      RefreshToken: refreshToken,
    };
  },
};
