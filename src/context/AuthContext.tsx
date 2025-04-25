import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  authService,
  LoginRequest,
  LoginResponse,
} from "../services/authService";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../types/api";
import axios, { AxiosError } from "axios";
import { sessionUtils } from "../utils/sessionUtils";

export interface AuthContextType {
  user: LoginResponse["userDto"] | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoginResponse["userDto"] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage al cargar
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await authService.login(credentials);
      setUser(data.userDto);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      let errorMessage = "Error al iniciar sesión";

      // Comprobamos si es un error de Axios
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ApiError>;
        // Verificamos si hay datos de respuesta
        if (axiosError.response?.data) {
          errorMessage = axiosError.response.data.message || errorMessage;
        }
      }

      setError(errorMessage);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Error durante logout:", error);
      // Asegurar que la sesión se limpie incluso si hay un error
      sessionUtils.clearSession();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
