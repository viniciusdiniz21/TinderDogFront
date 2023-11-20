import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export default function Match({ img, img2 }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        sx={{ display: "none" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Match
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle textAlign="center" color="error" fontWeight={700}>
          DEU MATCH!
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
            <Avatar
              alt="Remy Sharp"
              src={img}
              sx={{ width: "10rem", height: "10rem" }}
            />
            <Avatar
              alt="Remy Sharp"
              src={img2}
              sx={{ width: "10rem", height: "10rem" }}
            />
          </Box>
          {/* ADICIONAR AS FOTOS DOS CACHORROS*/}
          <DialogContentText
            textAlign="center"
            fontWeight={700}
            color="primary"
            mt={2}
          >
            Você deu match com {"NOME"}, envie uma mensagem!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Fechar
          </Button>
          <Button
            onClick={() => navigate("mensagens")}
            variant="outlined"
            sx={{ fontWeight: 700 }}
          >
            Mensagens
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
