import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import logo from "../../assets/logo.png";
import api from "../../services/api";
import Swal from "sweetalert2";

const Raca = () => {
  const [loading, setLoading] = React.useState(false);
  const [formValues, setFormValues] = useState({
    nomeRaca: "",
    tamanho: "",
    porte: "",
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
      const response = await api.post(`/Raca/Adicionar`, {
        nomeRaca: formValues.nome,
        tamanho: formValues.tamanho,
        porte: formValues.porte,
        ativo: true,
      });
      Swal.fire({
        title: "Pronto!",
        text: "Raça cadastrada.",
        icon: "success",
      });

      setFormValues({
        nomeRaca: "",
        tamanho: "",
        porte: "",
        ativo: true,
      });
      return response;
    } catch (err) {
      Swal.fire({
        title: "error",
        text: "Erro ao cadastrar raça.",
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
          <Typography variant="h6">Cadastrar Animal</Typography>
          <TextField
            label="Nome"
            name="nome"
            value={formValues.nome}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Tamanho"
            name="tamanho"
            value={formValues.tamanho}
            onChange={handleChange}
            placeholder="Em cm"
            fullWidth
            required
          />
          <TextField
            label="Porte"
            name="porte"
            value={formValues.porte}
            onChange={handleChange}
            fullWidth
            InputProps={{
              inputProps: {
                maxLength: 1,
              },
            }}
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

export default Raca;
