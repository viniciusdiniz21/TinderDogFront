// src/MenuLateral.js
import React from "react";
import { styled } from "@mui/system";
import { List, ListItem, ListItemText, useTheme, Avatar } from "@mui/material";

const MenuContainer = styled("div")({
  width: "200px",
  height: "60vh",
});

const MenuLateral = ({
  conversas,
  conversaSelecionada,
  selecionarConversa,
}) => {
  const theme = useTheme();
  return (
    <MenuContainer sx={{ backgroundColor: theme.palette.primary.dark }}>
      <List>
        {conversas.map((conversa, index) => (
          <ListItem
            key={index}
            sx={{ display: "flex", gap: 2 }}
            onClick={() => selecionarConversa(index)}
            button
            selected={index === conversaSelecionada}
          >
            <Avatar alt="Cachorro" src={conversa.foto} />
            <ListItemText primary={conversa.nome} />
          </ListItem>
        ))}
      </List>
    </MenuContainer>
  );
};

export default MenuLateral;
