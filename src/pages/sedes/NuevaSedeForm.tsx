import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { sedeService } from "../../services/sedeService";
import { SedeCreate } from "../../types/sede";
import { ApiError } from "../../types/api";

const NuevaSedeForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SedeCreate>({
    defaultValues: {
      nombreSede: "",
      estado: true,
    },
  });

  const onSubmit: SubmitHandler<SedeCreate> = async (data) => {
    try {
      setLoading(true);
      setError(null);
      await sedeService.createSede(data);
      setSuccess(true);
      reset();
      // Opcional: navegar automáticamente después de un tiempo
      setTimeout(() => {
        navigate("/sedes");
      }, 2000);
    } catch (err: unknown) {
      console.error("Error al crear sede:", err);

      // Verificamos si es un error de API
      if (isApiError(err)) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "object" && err !== null && "response" in err) {
        // Para errores de Axios
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosError.response?.data?.message || "No se pudo crear la sede"
        );
      } else {
        setError("Ocurrió un error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  // Función auxiliar para verificar si es un ApiError
  function isApiError(error: unknown): error is ApiError {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      "status" in error
    );
  }

  const handleCancel = () => {
    navigate("/sedes");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={handleCancel}
          sx={{ mr: 2 }}
        >
          Volver
        </Button>
        <Typography variant="h4" component="h1">
          Nueva Sede
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Sede creada correctamente. Redirigiendo...
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* En MUI v6, usa Grid sin 'item' */}
              <Grid xs={12}>
                <Controller
                  name="nombreSede"
                  control={control}
                  rules={{ required: "El nombre de la sede es obligatorio" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nombre de la Sede"
                      variant="outlined"
                      fullWidth
                      error={!!errors.nombreSede}
                      helperText={errors.nombreSede?.message}
                      disabled={loading}
                    />
                  )}
                />
              </Grid>

              <Grid xs={12}>
                <Controller
                  name="estado"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          disabled={loading}
                        />
                      }
                      label="Sede activa"
                    />
                  )}
                />
              </Grid>

              <Grid xs={12} sx={{ mt: 2 }}>
                <Box
                  sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    startIcon={
                      loading && <CircularProgress size={20} color="inherit" />
                    }
                  >
                    {loading ? "Guardando..." : "Guardar Sede"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NuevaSedeForm;
