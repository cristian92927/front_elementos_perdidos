import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
import { sedeService } from "../../services/sedeService";
import { Sede } from "../../types/sede";
import { useGlobalStyles } from "../../styles/globalStyles";

const SedesPage: React.FC = () => {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const navigate = useNavigate();
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const globalClasses = useGlobalStyles();

  // Ajuste automático de filas por página según el tamaño de la pantalla
  useEffect(() => {
    if (isXsScreen && rowsPerPage > 5) {
      setRowsPerPage(5);
      setPage(0);
    }
  }, [isXsScreen]);

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        setLoading(true);
        const data = await sedeService.getAllSedes();
        setSedes(data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar sedes:", err);
        setError(
          "No se pudieron cargar las sedes. Por favor, intente nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSedes();
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddSede = () => {
    navigate("/sedes/crear");
  };

  const handleEditSede = (id: number) => {
    navigate(`/sedes/editar/${id}`);
  };

  if (loading) {
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

  if (error) {
    return (
      <Paper sx={{ p: 3, mt: 3, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
        <Button
          variant="outlined"
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Reintentar
        </Button>
      </Paper>
    );
  }

  return (
    // Contenedor principal responsivo
    <Box
      className={globalClasses.fullWidthTable}
      sx={{
        width: "100%",
        overflow: "hidden", // Previene el desbordamiento horizontal
      }}
    >
      <Box
        sx={{
          mb: { xs: 2, sm: 4 }, // Margen responsivo
          px: { xs: 0, sm: 1 }, // Padding horizontal responsivo
        }}
      >
        <Typography
          variant={isXsScreen ? "h5" : "h4"}
          component="h1"
          gutterBottom
        >
          Gestión de Sedes
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Administra las sedes disponibles en el sistema
        </Typography>
      </Box>

      <Card
        elevation={3}
        sx={{
          borderRadius: 2,
          width: "100%",
          // Altura adaptable según el dispositivo
          height: {
            xs: "calc(100vh - 180px)",
            sm: "calc(100vh - 190px)",
            md: "calc(100vh - 200px)",
          },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: { xs: 1.5, sm: 2, md: 2.5 }, // Padding escalonado por tamaño
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            gap: { xs: 1.5, sm: 0 },
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem" }, // Texto más pequeño en móvil
              mb: { xs: 1, sm: 0 },
            }}
          >
            Listado de sedes
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddSede}
            fullWidth={isXsScreen}
            size={isXsScreen ? "medium" : "medium"}
            sx={{
              py: { xs: 1, sm: 0.8 }, // Altura ajustable
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Nueva Sede
          </Button>
        </Box>

        <Divider />

        {/* Contenedor de tabla responsivo */}
        <TableContainer
          sx={{
            flexGrow: 1,
            overflow: "auto",
            maxWidth: "none",
            width: "100%",
            // Altura mínima para asegurar espacio suficiente para la tabla
            minHeight: { xs: "300px", sm: "350px" },
          }}
        >
          <Table
            stickyHeader
            sx={{
              width: "100%",
              tableLayout: "fixed",
              // Ancho mínimo para asegurar scroll horizontal en vez de compresión
              minWidth: { xs: "550px", sm: "650px" },
            }}
            aria-label="tabla de sedes"
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.02)",
                  "& th": {
                    fontWeight: "bold",
                    // Padding adaptativo según tamaño de pantalla
                    px: { xs: 1, sm: 2 },
                    py: { xs: 1.5, sm: 2 },
                  },
                }}
              >
                <TableCell width="8%">ID</TableCell>
                <TableCell
                  width={isXsScreen ? "40%" : isMdScreen ? "50%" : "65%"}
                >
                  Nombre
                </TableCell>
                <TableCell width={isXsScreen ? "25%" : "15%"}>Estado</TableCell>
                <TableCell width={isXsScreen ? "15%" : "12%"} align="center">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sedes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((sede) => (
                  <TableRow
                    key={sede.id}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      transition: "background-color 0.2s",
                      // Altura de fila adaptable
                      height: { xs: "48px", sm: "53px" },
                    }}
                  >
                    <TableCell sx={{ px: { xs: 1, sm: 2 } }}>
                      {sede.id}
                    </TableCell>
                    <TableCell
                      sx={{
                        px: { xs: 1, sm: 2 },
                        // Permite truncar texto largo con ellipsis en móvil
                        whiteSpace: { xs: "nowrap", sm: "normal" },
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {sede.nombreSede}
                    </TableCell>
                    <TableCell sx={{ px: { xs: 1, sm: 2 } }}>
                      <Chip
                        label={sede.estado ? "Activo" : "Inactivo"}
                        color={sede.estado ? "success" : "default"}
                        size="small"
                        sx={{
                          minWidth: { xs: 70, sm: 80 },
                          height: { xs: 24, sm: 32 },
                          fontSize: { xs: "0.7rem", sm: "0.75rem" },
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ px: { xs: 0.5, sm: 2 } }}>
                      <IconButton
                        aria-label="editar"
                        color="primary"
                        onClick={() => handleEditSede(sede.id)}
                        size={isXsScreen ? "small" : "medium"}
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(25, 118, 210, 0.08)",
                          },
                        }}
                      >
                        <EditIcon fontSize={isXsScreen ? "small" : "medium"} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

              {sedes.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                    sx={{ py: { xs: 4, sm: 6 } }}
                  >
                    <Typography
                      variant={isXsScreen ? "body2" : "subtitle1"}
                      color="text.secondary"
                    >
                      No hay sedes registradas
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación adaptativa mejorada */}
        <Box
          sx={{
            borderTop: 1,
            borderColor: "divider",
            padding: { xs: 1, sm: 1, md: 0 },
            backgroundColor: theme.palette.background.paper, // Asegura contraste
          }}
        >
          <TablePagination
            rowsPerPageOptions={isXsScreen ? [5, 10] : [5, 10, 25, 50]}
            component="div"
            count={sedes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={isXsScreen ? "Filas:" : "Filas por página:"}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de ${count}`
            }
            sx={{
              ".MuiTablePagination-toolbar": {
                flexWrap: "wrap",
                justifyContent: { xs: "center", sm: "flex-end" },
                padding: { xs: "0px 8px", sm: "0px 16px" },
                minHeight: { xs: 48, sm: 52 },
              },
              ".MuiTablePagination-selectLabel": {
                margin: { xs: 0.5, sm: 1 },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              },
              ".MuiTablePagination-select": {
                padding: { xs: "2px 20px 2px 8px", sm: "4px 28px 4px 8px" },
              },
              ".MuiTablePagination-displayedRows": {
                margin: { xs: 0.5, sm: 1 },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              },
              ".MuiTablePagination-actions": {
                marginLeft: { xs: 0, sm: 2 },
              },
            }}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default SedesPage;
