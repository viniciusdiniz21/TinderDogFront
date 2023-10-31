import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClearIcon from "@mui/icons-material/Clear";
import Slider from "../Slider/Slider";
import { Box, Divider, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { grey } from "@mui/material/colors";

const TinderCard = ({ images, onLike, onDislike, setCard }) => {
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
        borderRadius: "18px",
      }}
      elevation={10}
    >
      <Slider images={images} />
      <Box
        sx={{ mt: 1, ml: 2, cursor: "pointer" }}
        onClick={() => {
          setCard();
        }}
      >
        <Typography
          textAlign="left"
          fontWeight={600}
          color="primary"
          variant="h5"
          sx={{ fontFamily: "Poppins" }}
        >
          Cachorro - Vira-Lata
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocationOnIcon color="primary" />
          <Typography
            textAlign="left"
            fontWeight={600}
            color="primary"
            variant="body1"
            sx={{ fontFamily: "Poppins" }}
          >
            Araxá, MG
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ m: 1 }} />
      <CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
        <IconButton
          sx={{
            transition: "background-color .7s",
            "&:hover": { backgroundColor: grey[400] },
          }}
          onClick={onDislike}
        >
          <ClearIcon color="warning" sx={{ fontSize: "2rem" }} />
        </IconButton>
        <IconButton
          sx={{
            transition: "background-color .7s",
            "&:hover": { backgroundColor: grey[400] },
          }}
          onClick={onLike}
        >
          <FavoriteIcon color="error" sx={{ fontSize: "2rem" }} />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default TinderCard;
