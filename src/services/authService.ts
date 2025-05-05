// Constante para la URL base de la API
const API_URL = import.meta.env.VITE_API_URL;

export interface LoginRequest {
  usuario: string;
  contraseña: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  userDto: {
    id: number;
    nombre: string;
    userName: string;
    email: string;
    rol: string;
  };
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// Función auxiliar para hacer peticiones HTTP
const fetchApi = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_URL}${endpoint}`;

  // Configuración por defecto para las peticiones
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Agregar token de autorización si existe
  const token = localStorage.getItem("token");
  if (token) {
    defaultOptions.headers = {
      ...defaultOptions.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // Mezclar opciones
  const fetchOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // Realizar la petición
  const response = await fetch(url, fetchOptions);

  // Manejar errores HTTP
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw {
      status: response.status,
      message:
        errorData.message || `Error: ${response.status} ${response.statusText}`,
      errors: errorData.errors,
    };
  }

  // Devolver datos JSON
  return await response.json();
};

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const data = await fetchApi<LoginResponse>("/Auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    // Guardar token y refresh token en localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.userDto));

    return data;
  },

  logout: async (): Promise<void> => {
    // Simplemente limpiar el almacenamiento local para finalizar la sesión
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  getCurrentUser: (): LoginResponse["userDto"] | null => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem("token") !== null;
  },

  // Método auxiliar para refrescar el token
  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    const data = await fetchApi<LoginResponse>("/Auth/refresh-token", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });

    // Actualizar tokens en localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);

    return data;
  },
};
