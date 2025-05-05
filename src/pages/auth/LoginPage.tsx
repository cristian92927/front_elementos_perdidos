"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  CircularProgress,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Fade,
  useTheme,
  useMediaQuery,
  Divider,
  Avatar,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { authAdapter } from "../../adapters/authAdapter";
import ThemeToggle from "../../components/ui/ThemeToggle";

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { login, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    // Agregar animación de entrada
    setAnimateIn(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    // Usar el adaptador para transformar los datos
    const loginData = authAdapter.toLoginRequest(data);

    await login(loginData);
    if (error) {
      setOpenAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        position: "relative", // Añadimos esto para posicionar el toggle
      }}
    >
      {/* Toggle de tema en la esquina superior derecha */}
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <ThemeToggle />
      </Box>

      <Container
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={animateIn} timeout={800}>
          <Paper
            elevation={6}
            sx={{
              p: isMobile ? 3 : 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 4,
              width: "100%",
              maxWidth: 500,
              background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              overflow: "hidden",
              position: "relative",
              transition: "all 0.3s ease",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "6px",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              },
              "&:hover": {
                boxShadow: "0 12px 48px rgba(0, 0, 0, 0.12)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                mb: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: "primary.main",
                  width: 56,
                  height: 56,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <LockOutlined />
              </Avatar>
              <Typography
                component="h1"
                variant={isMobile ? "h5" : "h4"}
                sx={{
                  mt: 2,
                  fontWeight: 700,
                  color: "text.primary",
                  textAlign: "center",
                  letterSpacing: "-0.5px",
                }}
              >
                Sistema de Elementos Perdidos
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, textAlign: "center" }}
              >
                Ingresa tus credenciales para acceder al sistema
              </Typography>
            </Box>

            <Divider sx={{ width: "80%", mb: 3 }} />

            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <TextField
                margin="normal"
                fullWidth
                id="username"
                label="Nombre de usuario"
                variant="outlined"
                autoComplete="username"
                autoFocus
                {...register("username", {
                  required: "El nombre de usuario es requerido",
                })}
                error={!!errors.username}
                helperText={errors.username?.message}
                disabled={isLoading}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.1)",
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.light",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderWidth: 2,
                    },
                  },
                }}
              />

              <TextField
                margin="normal"
                fullWidth
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                variant="outlined"
                {...register("password", {
                  required: "La contraseña es requerida",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={isLoading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                        edge="end"
                        sx={{
                          color: showPassword
                            ? "primary.main"
                            : "text.secondary",
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.1)",
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "primary.light",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderWidth: 2,
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  mt: 2,
                  mb: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.3s ease",
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  "&:hover": {
                    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                    transform: "translateY(-2px)",
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  },
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                  mt: 1,
                  mb: 2,
                }}
              >
                <Link
                  to="/forgot-password"
                  style={{
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{
                      fontWeight: 500,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: theme.palette.primary.dark,
                        textDecoration: "underline",
                      },
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Typography>
                </Link>
              </Box>
            </form>
          </Paper>
        </Fade>

        <Snackbar
          open={openAlert && !!error}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={Fade}
        >
          <Alert
            onClose={handleCloseAlert}
            severity="error"
            variant="filled"
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default LoginPage;
