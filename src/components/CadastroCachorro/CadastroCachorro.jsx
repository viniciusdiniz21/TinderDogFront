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
} from "@mui/material";
import logo from "../../assets/logo.png";
import { PhotoCamera } from "@mui/icons-material";
import { ReactCrop } from "react-image-crop";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../services/firebaseConfig";
import { UserContext } from "../../context/UserContext";
import dayjs from "dayjs";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

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
    racaId: null,
    porteId: null,
    foto: null,
    fotoURL: null,
  });

  const [racas, setRacas] = React.useState([]);
  const [portes, setPortes] = React.useState([]);

  React.useEffect(() => {
    handleRaca();
    handlePorte();
  }, []);

  const handleRaca = async () => {
    try {
      const response = await api.get("Raca/Listar");
      setRacas(response.data);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };
  const handlePorte = async () => {
    try {
      const response = await api.get("Porte/Listar");
      setPortes(response.data);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const usuario = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const db = getStorage(app);

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
      uploadImageAndGetURL(file, file.lastModified);
    }, "image/jpeg");
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
        alert("Erro ao enviar imagem");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormValues({
            ...formValues,
            foto: downloadURL,
          });
          handleCadastro(downloadURL);
        });
      }
    );
  };

  const handleCadastro = async (imgUrl) => {
    setLoading(true);
    try {
      const response = await api.post(`/Animal`, {
        nome: formValues.nome,
        foto: imgUrl,
        porteId: formValues.porteId,
        racaId: formValues.racaId,
        usuarioId: usuario.id,
        dataNascimento: dayjs(),
        curtida: [],
        ativo: true,
      });
      alert("Cadastrado com sucesso");
      navigate("../");
      return response;
    } catch (err) {
      alert("Erro no cadastro");
    }
    setLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleImage(completedCrop, formValues.foto);
    console.log(formValues);
    /* handleCadastro(); */
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
