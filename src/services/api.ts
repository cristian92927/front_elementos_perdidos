import axios from "axios";
import { sessionUtils } from "../utils/sessionUtils";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Si el error es 401 (No autorizado) y no se ha intentado refrescar el token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Aquí podrías implementar la lógica para refrescar el token
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        // Si no hay refresh token, redirigir al login
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // Intentar refrescar el token
      return api
        .post("/Auth/refresh-token", { refreshToken })
        .then((res) => {
          if (res.status === 200) {
            // Guardar el nuevo token
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            // Actualizar el header de la solicitud original
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${res.data.token}`;

            // Reintentar la solicitud original
            return api(originalRequest);
          }
        })
        .catch(() => {
          // Si no se puede refrescar el token, limpiar y redirigir
          sessionUtils.clearSession();
          window.location.href = "/login";
          return Promise.reject(error);
        });
    }

    return Promise.reject(error);
  }
);

export default api;
