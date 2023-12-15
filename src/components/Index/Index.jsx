import * as React from "react";
import TinderCard from "../Card/Card";
import InfoCard from "../Card/CardInfo";
import Match from "../Match/Match";
import api from "../../services/api";
import { CircularProgress, Typography } from "@mui/material";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { UserContext } from "../../context/UserContext";

function Index() {
  const [showCard, setShowCard] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [cachorros, setCachorros] = React.useState([]);
  const [loadingLike, setLoadingLike] = React.useState(false);
  const [fimDaLista, setFimDaLista] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { user, setUser } = React.useContext(UserContext);
  const animalId = Cookies.get("idanimal");

  const handleChangeIndex = () => {
    if (index == 0) {
      return setFimDaLista(true);
    }
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleLike = async () => {
    setLoadingLike(true);

    try {
      const response = await api.post("Animal/Curtida", {
        animalId: animalId,
        destinoId: cachorros[index].id,
        curtiu: true,
        ativo: true,
      });

      if (response.status == 201) {
        return setOpen(true);
      }
      handleChangeIndex();
      return response;
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoadingLike(false);
    }
  };

  const handleDislike = async () => {
    setLoadingLike(true);
    try {
      const response = await api.post("Animal/Curtida", {
        animalId: animalId,
        destinoId: cachorros[index].id,
        curtiu: false,
        ativo: true,
      });
      handleChangeIndex();
      return response;
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoadingLike(false);
    }
  };

  React.useEffect(() => {
    handleDogs();
  }, []);

  function FiltrarListagem(lista) {
    console.log(lista);
    if (user.animal != null) {
      const listaCurtidas = user.animal?.curtida;
      const idsCurtidas = new Set(
        listaCurtidas.map((curta) => curta.destinoId)
      );
      idsCurtidas.add(user.animal?.id);
      const listaAnimaisFiltrada = lista.filter(
        (animal) => !idsCurtidas.has(animal.id)
      );
      return listaAnimaisFiltrada;
    }
    return lista;
  }

  const handleDogs = async () => {
    setLoading(true);
    try {
      const response = await api.get("Animal");
      const dogs = FiltrarListagem(response.data);
      setCachorros(dogs);
      setIndex(dogs.length - 1);
      return response;
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowCard(!showCard);
  };

  if (fimDaLista || cachorros.length == 0)
    return (
      <>
        <Typography>Acabaram os cachorros...</Typography>
        <Typography>Volte mais tarde!</Typography>
      </>
    );

  return (
    <div className="card-container">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {cachorros.length > 0 && (
            <div className={`card ${isFlipped ? "flipped" : ""}`}>
              <div className={`card-inner ${showCard ? "front" : "back"}`}>
                {showCard ? (
                  <TinderCard
                    onLike={handleLike}
                    onDislike={handleDislike}
                    setCard={handleFlip}
                    nome={cachorros[index].nome}
                    raca={cachorros[index].raca?.nomeRaca}
                    foto={cachorros[index].foto}
                    listaFotos={
                      cachorros[index].imagems == null
                        ? []
                        : cachorros[index].imagems
                    }
                  />
                ) : (
                  <InfoCard
                    nome={cachorros[index].nome}
                    idade={dayjs().diff(
                      dayjs(cachorros[index].dataNascimento),
                      "year"
                    )}
                    raca={cachorros[index].raca?.nomeRaca}
                    peso={cachorros[index].porte?.tamanho}
                    cidade="Araxá"
                    setCard={handleFlip}
                    estado="MG"
                    foto={cachorros[index].foto}
                    listaFotos={
                      cachorros[index].imagems == null
                        ? []
                        : cachorros[index].imagems
                    }
                  />
                )}
                {/*trocar para 1 foto de cada cachorro*/}
                <Match
                  nome={cachorros[index].nome}
                  img={cachorros[index].foto}
                  open={open}
                  setOpen={setOpen}
                  handleChangeIndex={handleChangeIndex}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Index;
