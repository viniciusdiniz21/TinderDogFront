import React from "react";

import { styled } from "@mui/system";
import {
  Typography,
  Box,
  Avatar,
  Divider,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../../context/UserContext";
import api from "../../services/api";
import Cookies from "js-cookie";

const Container = styled("div")({
  border: "1px solid #ccc",
  borderRadius: "8px",
  margin: "10px",
  padding: "10px",
  width: "500px",
  backgroundColor: "#f5f5f5",
  height: "60vh",
  display: "flex",
  flexDirection: "column",
});

const Msg = styled("div")({
  backgroundColor: "#fff",
  border: "1px solid #ccc",
  borderRadius: "5px",
  margin: "5px 0",
  padding: "8px 12px",
  listStyleType: "none",
  color: "black",
});

const MensagemEnviada = styled(Msg)({
  backgroundColor: "#dcf8c6",
  maxWidth: "70%",
});

const MensagemRecebida = styled(Msg)({
  backgroundColor: "#ffffff",
  maxWidth: "70%",
});

const Mensagem = ({ nome, foto, mensagens, matchId, idCachorro }) => {
  const [mensagem, setMensagem] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleMsg = async () => {
    setLoading(true);
    const id = Cookies.get("idanimal");
    const obj = {
      conteudo: mensagem,
      matchId: matchId,
      cachorro1: id,
      cachorro2: idCachorro,
      ativo: true,
    };
    try {
      const response = await api.post(`/Mensagem`, obj);

      return response;
    } catch (err) {
      alert("Erro no cadastro");
    }
    setLoading(false);
  };

  return (
    <Container>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar alt="Cachorro" src={foto} />
          <Typography
            sx={{ fontFamily: "Poppins" }}
            color="primary"
            variant="h6"
            fontWeight={700}
          >
            {nome}
          </Typography>
        </Box>
        <Divider sx={{ m: 1 }} />
      </Box>
      <Box sx={{ maxHeight: "70%", overflowY: "scroll" }}>
        <ul>
          {mensagens.map((mensagem, index) => (
            <li key={index}>
              {mensagem.tipo === "enviada" ? (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <MensagemEnviada>{mensagem.conteudo}</MensagemEnviada>
                </Box>
              ) : (
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <MensagemRecebida>{mensagem.conteudo}</MensagemRecebida>
                </Box>
              )}
            </li>
          ))}
        </ul>
      </Box>
      <Box sx={{ display: "flex", pt: 2 }}>
        <TextField
          placeholder="Digite..."
          value={mensagem}
          fullWidth
          onChange={(ev) => setMensagem(ev.target.value)}
        />
        <IconButton onClick={() => handleMsg()}>
          <SendIcon color="primary" />
        </IconButton>
      </Box>
    </Container>
  );
};

export default Mensagem;
