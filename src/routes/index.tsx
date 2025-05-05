import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";

import DashboardPage from "../pages/dashboard/DashboardPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";
import { useAuth } from "../hooks/useAuth";

// Importamos páginas placeholder para las nuevas rutas
import PlaceholderPage from "../components/common/PlaceholderPage";

// Importamos las páginas del módulo de Sedes
import SedesPage from "../pages/sedes/SedesPage";
import NuevaSedeForm from "../pages/sedes/NuevaSedeForm";
import EditarSedeForm from "../pages/sedes/EditarSedeForm";

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        }
      />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/usuarios"
            element={
              <PlaceholderPage
                title="Gestión de Usuarios"
                description="Administra los usuarios del sistema"
              />
            }
          />
          <Route
            path="/contactos"
            element={
              <PlaceholderPage
                title="Contactos"
                description="Gestiona la información de contactos"
              />
            }
          />
          <Route
            path="/entregas-bajas"
            element={
              <PlaceholderPage
                title="Entregas y Bajas"
                description="Administra entregas y bajas de elementos"
              />
            }
          />

          {/* Rutas del módulo de Sedes */}
          <Route path="/sedes" element={<SedesPage />} />
          <Route path="/sedes/crear" element={<NuevaSedeForm />} />
          <Route path="/sedes/editar/:id" element={<EditarSedeForm />} />

          <Route
            path="/elementos"
            element={
              <PlaceholderPage
                title="Elementos"
                description="Gestiona el inventario de elementos"
              />
            }
          />
          <Route
            path="/estadisticas"
            element={
              <PlaceholderPage
                title="Estadísticas"
                description="Visualiza estadísticas y reportes"
              />
            }
          />
        </Route>
      </Route>

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
