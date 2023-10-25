import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClearIcon from "@mui/icons-material/Clear";
import Slider from "../Slider/Slider";
import { Box, Divider, Typography } from "@mui/material";

const TinderCard = ({ images, onLike, onDislike, setCard }) => {
  return (
    <Card
      sx={{
        width: 500,
        maxWidth: "80vw",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "70vh",
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
          sx={{ textDecoration: "underline" }}
        >
          Cachorro - Vira-Lata
        </Typography>
        <Typography
          textAlign="left"
          fontWeight={600}
          color="primary"
          variant="body1"
        >
          Araxá, MG
        </Typography>
      </Box>
      <Divider sx={{ m: 1 }} />
      <CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
        <IconButton onClick={onDislike}>
          <ClearIcon color="warning" sx={{ fontSize: "2rem" }} />
        </IconButton>
        <IconButton onClick={onLike}>
          <FavoriteIcon color="error" sx={{ fontSize: "2rem" }} />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default TinderCard;
