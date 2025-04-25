/**
 * Utilidad para gestionar la sesión del usuario
 */
export const sessionUtils = {
  /**
   * Limpia todos los datos de sesión del localStorage
   */
  clearSession: (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Método mejorado para eliminar todas las cookies
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name =
        eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

      // Intentar todas las combinaciones posibles para asegurar que se eliminan
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname};`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname};`;
    }
  },

  /**
   * Verifica si hay una sesión activa
   */
  hasActiveSession: (): boolean => {
    return Boolean(localStorage.getItem("token"));
  },
};
