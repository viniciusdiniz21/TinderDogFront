import React, { FormEvent, useContext } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
/* import api from "../../services/api"; */
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
/* import { useLoaderData, useNavigate } from "react-router-dom"; */
/* import Cookies from "js-cookie"; */
import logo from "../../assets/logo.png";
import "./login.css";
import { Typography } from "@mui/material";
import api from "../../services/api";
import { UserContext } from "../../context/UserContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const classes = {
  root: {
    height: "100vh",
    width: "100vw",
  },

  paper: {
    margin: "16px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "75vh",
  },
  avatar: {
    margin: "8px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "8px",
  },
  submit: {
    margin: "24px 0px 16px",
    color: "white",
  },
};

export const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post(`/Auth/Login`, {
        usuario: login,
        senha: password,
      });
      Cookies.set("access_token", response.data.token);
      Cookies.set("id", response.data.id);
      Cookies.set("nome", response.data.nome);
      localStorage.setItem("animal", JSON.stringify(response.data.animal));
      setUser({
        ...user,
        id: response.data.id,
        nome: response.data.nome,
        token: response.data.token,
        animal: response.data.animal,
      });

      if (response.data.animal == null) {
        navigate("../cadastrar");
      } else {
        Cookies.set("idanimal", response.data.animal.id);
        navigate("../");
      }
      return response;
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Erro!",
        text: "Erro ao fazer login.",
        icon: "error",
      });
    }
    setLoading(false);
  };

  return (
    <Grid container component="main" style={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={6} md={7} className="image"></Grid>
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
        <Box sx={classes.paper}>
          <Box sx={{ maxWidth: 140, flex: 1, mt: 4 }}>
            <img style={{ maxWidth: "100%" }} src={logo}></img>
          </Box>
          <Box sx={{ maxWidth: 200, flex: 1 }}>
            <Typography
              sx={{ fontFamily: "cursive" }}
              color="primary"
              variant="h4"
            >
              TINDER DOG
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleUser} style={classes.form}>
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              color="primary"
              sx={classes.submit}
            >
              {loading ? (
                <CircularProgress color="inherit" size={26} />
              ) : (
                "Entrar"
              )}
            </Button>
            <Link href="/criarconta" /* onClick={handleOpen}*/ variant="body2">
              CRIAR CONTA
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
