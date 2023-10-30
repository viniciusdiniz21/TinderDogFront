import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PetsIcon from "@mui/icons-material/Pets";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Divider, IconButton } from "@mui/material";
import Slider from "../Slider/Slider";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { useTheme } from "@mui/material";

const InfoCard = ({
  nome,
  idade,
  raca,
  peso,
  cidade,
  estado,
  images,
  setCard,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: 500,
        maxWidth: "80vw",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: { xs: 450, sm: "70vh" },
        overflowY: "scroll",
        borderRadius: "24px",
      }}
      elevation={10}
    >
      <Slider images={images} />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box>
          <Box sx={{ mb: 2 }}>
            <PetsIcon color="primary" />
            <Divider />
          </Box>
          <Typography
            sx={{ fontFamily: "Poppins" }}
            variant="body2"
            color="text.secondary"
            textAlign="left"
          >
            Nome: {nome}
          </Typography>
          <Typography
            sx={{ fontFamily: "Poppins" }}
            variant="body2"
            color="text.secondary"
            textAlign="left"
          >
            Raça: {raca}
          </Typography>
        </Box>
        <Box>
          <Box sx={{ mb: 2 }}>
            <InfoIcon color="primary" />
            <Divider />
          </Box>
          <Typography
            sx={{ fontFamily: "Poppins" }}
            variant="body2"
            color="text.secondary"
            textAlign="left"
          >
            Idade: {idade} anos
          </Typography>
          <Typography
            sx={{ fontFamily: "Poppins" }}
            variant="body2"
            color="text.secondary"
            textAlign="left"
          >
            Peso: {peso} kg
          </Typography>
        </Box>
        <Box>
          <Box sx={{ mb: 2 }}>
            <LocationOnIcon color="primary" />
            <Divider />
          </Box>
          <Typography
            sx={{ fontFamily: "Poppins" }}
            variant="body2"
            color="text.secondary"
            textAlign="left"
          >
            {cidade}/{estado}
          </Typography>
        </Box>
      </CardContent>
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
      >
        <IconButton
          onClick={() => setCard()}
          sx={{
            backgroundColor: theme.palette.primary.main,
            "&:hover": { backgroundColor: theme.palette.primary.light },
          }}
        >
          <ArrowCircleUpIcon
            color="secondary"
            sx={{
              fontSize: "2rem",
            }}
          />
        </IconButton>
      </Box>
    </Card>
  );
};

export default InfoCard;
