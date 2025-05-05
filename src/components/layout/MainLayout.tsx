import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import ThemeToggle from "../ui/ThemeToggle";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import { useMenu } from "../../hooks/useMenu";

// Ancho del drawer
const drawerWidth = 240;

// En el componente MainLayout agrega un arreglo de rutas que deberían ser de ancho completo
const fullWidthRoutes = ["/sedes", "/sedes/crear", "/sedes/editar"];

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { menuOptions, isLoading } = useMenu();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const renderMenuItems = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
          <CircularProgress size={30} />
        </Box>
      );
    }

    return menuOptions.map((item) => (
      <ListItem key={item.name} disablePadding>
        <ListItemButton
          onClick={() => handleMenuClick(item.route)}
          selected={location.pathname === item.route}
          sx={{
            py: 1.5,
            "&.Mui-selected": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.04)",
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.12)"
                    : "rgba(0, 0, 0, 0.08)",
              },
            },
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.03)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color:
                location.pathname === item.route ? "primary.main" : "inherit",
              minWidth: 40,
            }}
          >
            {renderIcon(item.icon)}
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      </ListItem>
    ));
  };

  const renderIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      people: <PeopleOutlineIcon />,
      contacts: <ContactsOutlinedIcon />,
      dashboard: <DashboardOutlinedIcon />,
      shipping: <LocalShippingOutlinedIcon />,
      location: <LocationOnOutlinedIcon />,
      inventory: <InventoryOutlinedIcon />,
      chart: <BarChartOutlinedIcon />,
    };

    return iconMap[iconName] || <CircleIcon />;
  };

  // Luego, dentro del componente, agrega una comprobación:
  const isFullWidthPage = fullWidthRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // Contenido del drawer (menú lateral)
  const drawer = (
    <Box sx={{ overflow: "auto" }}>
      <Box
        sx={{
          py: 2,
          px: 2,
          display: "flex",
          alignItems: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            mr: 2,
          }}
        >
          <PersonIcon />
        </Avatar>
        <Typography variant="subtitle1" noWrap>
          {user?.nombre || "Usuario"}
        </Typography>
      </Box>

      <List sx={{ pt: 1 }}>{renderMenuItems()}</List>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={logout}
          startIcon={<PersonIcon />}
          sx={{ borderRadius: 2 }}
        >
          Cerrar Sesión
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: 2,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="abrir menú"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Elementos Perdidos
          </Typography>

          {/* Botón para cambiar el tema */}
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      {/* Drawer para móviles */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            boxShadow: 3,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Drawer permanente para escritorio */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            boxShadow: 1,
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <Toolbar /> {/* Espaciado para compensar la AppBar */}
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          bgcolor:
            theme.palette.mode === "dark" ? "background.default" : "grey.50",
          minHeight: "100vh",
          overflowX: isFullWidthPage ? "visible" : "hidden", // Permitir overflow en páginas de ancho completo
        }}
      >
        <Toolbar /> {/* Espaciado para compensar la AppBar */}
        {isFullWidthPage ? (
          <Box
            sx={{
              mt: 2,
              width: "100%",
              maxWidth: "none", // Sin restricciones de ancho
              marginLeft: "-24px", // Compensar el padding del contenedor padre
              marginRight: "-24px",
              paddingLeft: "24px",
              paddingRight: "24px",
              boxSizing: "border-box",
            }}
          >
            <Outlet />
          </Box>
        ) : (
          <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Outlet />
          </Container>
        )}
      </Box>
    </Box>
  );
};

export default MainLayout;
