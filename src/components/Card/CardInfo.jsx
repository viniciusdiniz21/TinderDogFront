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
  foto,
  listaFotos,
}) => {
  const theme = useTheme();
  let fotos = listaFotos.map((image) => {
    return image.url;
  });
  fotos.unshift(foto);

  return (
    <Card
      sx={{
        width: 400,
        maxWidth: "80vw",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: { xs: 450 },
        overflowY: "scroll",
        borderRadius: "24px",
        "&::-webkit-scrollbar-thumb":
          "background-color: transparent !important",
        "&::-webkit-scrollbar-track":
          "background-color: transparent !important",
      }}
      elevation={10}
    >
      <Slider images={fotos} />
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
            fontWeight={700}
          >
            Nome: {nome}
          </Typography>
          <Typography
            sx={{ fontFamily: "Poppins" }}
            variant="body2"
            color="text.secondary"
            textAlign="left"
            fontWeight={700}
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
            fontWeight={700}
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
