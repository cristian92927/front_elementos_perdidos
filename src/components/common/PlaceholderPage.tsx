import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 4,
        borderRadius: 2,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
      }}
    >
      <ConstructionIcon
        sx={{ fontSize: 80, color: "primary.main", opacity: 0.7, mb: 2 }}
      />

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        color="textSecondary"
        paragraph
        sx={{ maxWidth: 600, mb: 4 }}
      >
        {description}. Esta sección está en desarrollo.
      </Typography>

      <Box sx={{ "& > *": { m: 1 } }}>
        <Button variant="outlined" color="primary">
          Explorar
        </Button>
        <Button variant="contained" color="primary">
          Comenzar
        </Button>
      </Box>
    </Paper>
  );
};

export default PlaceholderPage;
