import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido, {user?.nombre || "Usuario"}
        </Typography>
        <Typography variant="body1" paragraph>
          Este es el panel principal del Sistema de Elementos Perdidos.
        </Typography>
        <Button variant="contained" onClick={logout}>
          Cerrar Sesión
        </Button>
      </Box>
    </Container>
  );
};

export default DashboardPage;
