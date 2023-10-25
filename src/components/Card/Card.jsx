import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClearIcon from "@mui/icons-material/Clear";
import Slider from "../Slider/Slider";
import { Divider } from "@mui/material";

const TinderCard = ({ images, onLike, onDislike }) => {
  return (
    <Card
      sx={{
        width: 500,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      elevation={10}
    >
      <Slider images={images} />
      <Divider sx={{ m: 1 }} />
      <CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
        <IconButton onClick={onDislike}>
          <ClearIcon color="warning" />
        </IconButton>
        <IconButton onClick={onLike}>
          <FavoriteIcon color="error" />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default TinderCard;
