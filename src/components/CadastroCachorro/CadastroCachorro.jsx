import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Paper,
} from "@mui/material";
import logo from "../../assets/logo.png";
import { PhotoCamera } from "@mui/icons-material";

const CadastroCachorro = () => {
  const [formValues, setFormValues] = useState({
    nome: "",
    idade: "",
    peso: "",
    raca: "",
    foto: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFotoChange = (event) => {
    setFormValues({
      ...formValues,
      foto: event.target.files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { nome, idade, peso, raca, foto };
    console.log(formData);
  };

  return (
    <Container>
      <Paper elevation={5} sx={{ padding: "1rem 2rem" }}>
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
            label="Idade"
            name="idade"
            value={formValues.idade}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Peso"
            name="peso"
            value={formValues.peso}
            onChange={handleChange}
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel>Raça</InputLabel>
            <Select
              name="raca"
              value={formValues.raca}
              label="Raça"
              onChange={handleChange}
              required
            >
              <MenuItem value="Golden Retriever">Golden Retriever</MenuItem>
              <MenuItem value="Labrador">Labrador</MenuItem>
              <MenuItem value="Poodle">Poodle</MenuItem>
            </Select>
          </FormControl>
          <label htmlFor="upload-button">
            <input
              style={{ display: "none" }}
              accept="image/*"
              id="upload-button"
              type="file"
              onChange={handleFotoChange}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<PhotoCamera />}
              color="secondary"
            >
              Escolher foto
            </Button>
          </label>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "1rem" }}
          >
            Cadastrar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CadastroCachorro;
