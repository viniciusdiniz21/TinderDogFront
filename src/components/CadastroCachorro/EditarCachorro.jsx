import React, { useContext, useRef, useState } from "react";
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
  CircularProgress,
  Typography,
  Avatar,
  Tooltip,
} from "@mui/material";
import logo from "../../assets/logo.png";
import { PhotoCamera } from "@mui/icons-material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { ReactCrop } from "react-image-crop";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../services/firebaseConfig";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../../context/UserContext";
import Swal from "sweetalert2";

const EditarCachorro = () => {
  const { user, setUser } = React.useContext(UserContext);

  const [formValues, setFormValues] = useState(user.animal);
  const [file, setFile] = useState(null);

  const [racas, setRacas] = React.useState([]);
  const [portes, setPortes] = React.useState([]);

  React.useEffect(() => {
    handleRaca();
    handlePorte();
  }, []);

  const handleRaca = async () => {
    try {
      const response = await api.get("Raca");
      setRacas(response.data);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };
  const handlePorte = async () => {
    try {
      const response = await api.get("Porte");
      setPortes(response.data);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const db = getStorage(app);

  const handleFotoChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadImageAndGetURL = (file, id) => {
    if (!file) return;
    setLoading(true);
    const useCollectionRef = ref(db, `fotos/${id}`);

    const uploadTask = uploadBytesResumable(useCollectionRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        Swal.fire({
          title: "Erro!",
          text: "Erro ao enviar imagem.",
          icon: "error",
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          handleSaveImg(downloadURL);
        });
      }
    );
  };

  const handleSaveImg = async (fotoUrl) => {
    setLoading(true);
    try {
      const response = await api.post(`/Imagem`, {
        animalId: user.animal.id,
        url: fotoUrl,
      });

      setLoading(false);
      Swal.fire({
        title: "Pronto!",
        text: "Imagem salva.",
        icon: "success",
      }).then(() => {
        setFile(null);
      });
      return response;
    } catch (err) {
      Swal.fire({
        title: "Erro!",
        text: "Erro ao salvar imagem.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };
  const handleEdit = async () => {
    let id = Cookies.get("id");
    setLoading(true);
    try {
      const response = await api.put(`/Animal`, formValues);
      Swal.fire({
        title: "Pronto!",
        text: "Cadastro editado.",
        icon: "success",
      });
      return response;
    } catch (err) {
      Swal.fire({
        title: "Erro!",
        text: "Erro no cadastro.",
        icon: "error",
      });
    }
    setLoading(false);
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    handleEdit();
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
          <img
            src={logo}
            style={{ width: "100px", cursor: "pointer" }}
            onClick={() => navigate("../")}
          />
          <Typography variant="h6">Editar Animal</Typography>
          <Box></Box>
          <label htmlFor="upload-button">
            <input
              style={{ display: "none" }}
              accept="image/*"
              id="upload-button"
              type="file"
              onChange={handleFotoChange}
            />
            <Tooltip arrow title="Adicionar mais imagens">
              <Avatar
                src=""
                style={{ width: 64, height: 64, cursor: "pointer" }}
              >
                <AddAPhotoIcon />
              </Avatar>
            </Tooltip>
          </label>
          {file != null && (
            <Button
              variant="contained"
              component="span"
              startIcon={<PhotoCamera />}
              color="success"
              onClick={() => uploadImageAndGetURL(file, file.name)}
            >
              Adicionar
              <br /> Foto
            </Button>
          )}
          <TextField
            label="Nome"
            name="nome"
            value={formValues.nome}
            onChange={handleChange}
            fullWidth
            required
          />

          <FormControl fullWidth>
            <InputLabel>Porte</InputLabel>
            <Select
              name="porteId"
              value={formValues.porteId}
              label="Porte"
              onChange={handleChange}
              required
            >
              {portes.map((porte) => {
                return <MenuItem value={porte.id}>{porte.sigla}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Raça</InputLabel>
            <Select
              name="racaId"
              value={formValues.racaId}
              label="Raça"
              onChange={handleChange}
              required
            >
              {racas.map((raca) => {
                return <MenuItem value={raca.id}>{raca.nomeRaca}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            style={{ marginTop: "1rem" }}
          >
            {loading ? <CircularProgress /> : "Editar"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditarCachorro;
