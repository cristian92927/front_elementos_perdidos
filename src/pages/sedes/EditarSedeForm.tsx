import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Sede, SedeCreate } from "../../types/sede";

const EditarSedeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [sede, setSede] = useState<Sede | null>(null);
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

  useEffect(() => {
    const fetchSede = async () => {
      if (!id) return;

      try {
        setFetching(true);
        const data = await sedeService.getSedeById(parseInt(id));
        setSede(data);

        // Establecer los valores en el formulario
        reset({
          nombreSede: data.nombreSede,
          estado: data.estado,
        });
      } catch (err: unknown) {
        console.error("Error al cargar sede:", err);

        // Manejo de errores mejorado
        if (err instanceof Error) {
          setError(`Error al cargar la sede: ${err.message}`);
        } else {
          setError("No se pudo cargar la información de la sede");
        }
      } finally {
        setFetching(false);
      }
    };

    fetchSede();
  }, [id, reset]);

  const onSubmit: SubmitHandler<SedeCreate> = async (data) => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      await sedeService.updateSede(parseInt(id), data);
      setSuccess(true);
      // Opcional: navegar automáticamente después de un tiempo
      setTimeout(() => {
        navigate("/sedes");
      }, 2000);
    } catch (err: unknown) {
      console.error("Error al actualizar sede:", err);

      // Manejo de errores con tipado seguro
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "object" && err !== null && "response" in err) {
        // Para errores de Axios
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosError.response?.data?.message || "No se pudo actualizar la sede"
        );
      } else {
        setError("Ocurrió un error desconocido al actualizar la sede");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/sedes");
  };

  if (fetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!sede && !fetching) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          No se encontró la sede especificada o no se pudo cargar la
          información.
          <Button
            variant="text"
            onClick={() => navigate("/sedes")}
            sx={{ ml: 2 }}
          >
            Volver al listado
          </Button>
        </Alert>
      </Container>
    );
  }

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
          Editar Sede
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Sede actualizada correctamente. Redirigiendo...
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
              <Grid item xs={12}>
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

              <Grid item xs={12}>
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

              <Grid item xs={12} sx={{ mt: 2 }}>
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
                    {loading ? "Guardando..." : "Actualizar Sede"}
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

export default EditarSedeForm;
