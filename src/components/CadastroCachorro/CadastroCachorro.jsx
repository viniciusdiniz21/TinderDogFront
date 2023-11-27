import React, { useRef, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Paper,
  Box,
} from "@mui/material";
import logo from "../../assets/logo.png";
import { PhotoCamera } from "@mui/icons-material";
import { ReactCrop } from "react-image-crop";

const CadastroCachorro = () => {
  const [crop, setCrop] = useState({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
    aspect: 1,
    locked: true,
  });
  const [completedCrop, setCompletedCrop] = useState();
  const [formValues, setFormValues] = useState({
    nome: "",
    idade: "",
    peso: "",
    raca: "",
    foto: null,
    fotoURL: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setFormValues({
        ...formValues,
        foto: file,
        fotoURL: reader.result, // Armazena a URL da imagem
      });
    };

    reader.readAsDataURL(file);
  };

  const handleImage = (cropDetails) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    var img = new Image();
    img.src = formValues.fotoURL;

    canvas.width = cropDetails.width;
    canvas.height = cropDetails.height;

    ctx.drawImage(
      img, // Sua imagem original
      cropDetails.x,
      cropDetails.y,
      cropDetails.width,
      cropDetails.height,
      0,
      0,
      cropDetails.width,
      cropDetails.height
    );

    canvas.toBlob((blob) => {
      // 'blob' é o objeto Blob que representa a imagem cortada
      // Você pode criar um novo arquivo usando este blob
      const file = new File([blob], "cortada.jpg", { type: "image/jpeg" });
      console.log(file);
    }, "image/jpeg");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleImage(completedCrop, formValues.foto);
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
          <Box sx={{ maxWidth: "80%" }}>
            {formValues.fotoURL != null && (
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                maxHeight={300}
                maxWidth={300}
              >
                <img style={{ maxWidth: "100%" }} src={formValues.fotoURL} />
              </ReactCrop>
            )}
          </Box>
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
