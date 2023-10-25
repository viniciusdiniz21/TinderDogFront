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
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "70vh",
        overflowY: "scroll",
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
          <Typography variant="body2" color="text.secondary" textAlign="left">
            Nome: {nome}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="left">
            Raça: {raca}
          </Typography>
        </Box>
        <Box>
          <Box sx={{ mb: 2 }}>
            <InfoIcon color="primary" />
            <Divider />
          </Box>
          <Typography variant="body2" color="text.secondary" textAlign="left">
            Idade: {idade} anos
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="left">
            Peso: {peso} kg
          </Typography>
        </Box>
        <Box>
          <Box sx={{ mb: 2 }}>
            <LocationOnIcon color="primary" />
            <Divider />
          </Box>
          <Typography variant="body2" color="text.secondary" textAlign="left">
            {cidade}/{estado}
          </Typography>
        </Box>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          ml: 2,
          mr: 2,
          mb: 2,
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
