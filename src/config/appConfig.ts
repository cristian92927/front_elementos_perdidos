/**
 * Configuración centralizada de la aplicación
 */
export const appConfig = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5150/api",
    timeout: 3000, // 15 segundos
  },
  auth: {
    tokenStorageKey: "token",
    refreshTokenStorageKey: "refreshToken",
    userStorageKey: "user",
    endpoints: {
      login: "/Auth/login",
      refreshToken: "/Auth/refresh-token",
      revokeToken: "/Auth/revoke-token",
    },
  },
  routes: {
    login: "/login",
    dashboard: "/dashboard",
    forgotPassword: "/forgot-password",
  },
};
