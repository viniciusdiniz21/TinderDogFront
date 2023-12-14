import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import logo from "../../assets/logo.png";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Usuario = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    nome: "",
    senha: "",
    token: null,
    ativo: true,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCadastro = async () => {
    setLoading(true);
    try {
      const response = await api.post(`/Usuario/Cadastrar`, {
        nome: formValues.nome,
        senha: formValues.senha,
        token: formValues.token,
        ativo: true,
      });
      Swal.fire({
        title: "Pronto!",
        text: "Usuario Cadastrado",
        icon: "success",
      });
      navigate("../login");
      setFormValues({
        nome: "",
        senha: "",
        token: null,
        ativo: true,
      });
      navigate;
      return response;
    } catch (err) {
      Swal.fire({
        title: "Erro!",
        text: "Erro ao cadastrar usuario.",
        icon: "error",
      });
    }
    setLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCadastro();
  };

  return (
    <Container>
      <Paper
        elevation={5}
        sx={{
          padding: "1rem 2rem",
          width: "50vw",
          minWidth: 280,
          maxHeight: "85vh",
          overflowY: "scroll",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <img src={logo} style={{ width: "100px" }} />
          <TextField
            label="Nome"
            name="nome"
            value={formValues.nome}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Senha"
            name="senha"
            value={formValues.senha}
            onChange={handleChange}
            type="password"
            fullWidth
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "1rem" }}
            disabled={loading}
          >
            {loading ? <CircularProgress /> : "Cadastrar"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Usuario;
