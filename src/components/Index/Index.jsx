import * as React from "react";
import TinderCard from "../Card/Card";
import InfoCard from "../Card/CardInfo";
import Match from "../Match/Match";
import api from "../../services/api";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
function Index() {
  const [showCard, setShowCard] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [cachorros, setCachorros] = React.useState([]);
  const [loadingLike, setLoadingLike] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const handleChangeIndex = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleLike = async () => {
    setLoadingLike(true);
    try {
      const response = await api.post("Animal/Curtida", {
        animalId: 1,
        destinoId: 2,
        curtiu: true,
      });
      if (response.status == 201) {
        console.log("deu match");
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
        animalId: 1,
        destinoId: 2,
        curtiu: false,
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

  const handleDogs = async () => {
    setLoading(true);
    try {
      const response = await api.get("Animal");
      setCachorros(response.data);
      setIndex(response.data.length - 1);
      return response;
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const img =
    "https://s2-casaejardim.glbimg.com/C9xbzBCFi6q_jWnb7pvArghYREQ=/0x0:620x406/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_a0b7e59562ef42049f4e191fe476fe7d/internal_photos/bs/2023/H/S/dOjOeVROCN7L82fXV8bQ/japones-que-gastou-r-76-mil-para-se-tornar-um-cachorro-tem-dificuldade-para-fazer-amizade-com-caes-de-verdade1.jpeg";
  const images = [
    "https://s2-casaejardim.glbimg.com/C9xbzBCFi6q_jWnb7pvArghYREQ=/0x0:620x406/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_a0b7e59562ef42049f4e191fe476fe7d/internal_photos/bs/2023/H/S/dOjOeVROCN7L82fXV8bQ/japones-que-gastou-r-76-mil-para-se-tornar-um-cachorro-tem-dificuldade-para-fazer-amizade-com-caes-de-verdade1.jpeg",
    "https://s2-casaejardim.glbimg.com/C9xbzBCFi6q_jWnb7pvArghYREQ=/0x0:620x406/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_a0b7e59562ef42049f4e191fe476fe7d/internal_photos/bs/2023/H/S/dOjOeVROCN7L82fXV8bQ/japones-que-gastou-r-76-mil-para-se-tornar-um-cachorro-tem-dificuldade-para-fazer-amizade-com-caes-de-verdade1.jpeg",
    "https://s2-casaejardim.glbimg.com/C9xbzBCFi6q_jWnb7pvArghYREQ=/0x0:620x406/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_a0b7e59562ef42049f4e191fe476fe7d/internal_photos/bs/2023/H/S/dOjOeVROCN7L82fXV8bQ/japones-que-gastou-r-76-mil-para-se-tornar-um-cachorro-tem-dificuldade-para-fazer-amizade-com-caes-de-verdade1.jpeg",
    "https://s2-casaejardim.glbimg.com/C9xbzBCFi6q_jWnb7pvArghYREQ=/0x0:620x406/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_a0b7e59562ef42049f4e191fe476fe7d/internal_photos/bs/2023/H/S/dOjOeVROCN7L82fXV8bQ/japones-que-gastou-r-76-mil-para-se-tornar-um-cachorro-tem-dificuldade-para-fazer-amizade-com-caes-de-verdade1.jpeg",
  ];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowCard(!showCard);
  };
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
                    images={[
                      cachorros[index].foto == "https.semfoto"
                        ? img
                        : cachorros[index].foto,
                    ]}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    setCard={handleFlip}
                    nome={cachorros[index].nome}
                    raca={cachorros[index].raca?.nomeRaca}
                  />
                ) : (
                  <InfoCard
                    images={[
                      cachorros[index].foto == "https.semfoto"
                        ? img
                        : cachorros[index].foto,
                    ]}
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
                  />
                )}
                {/*trocar para 1 foto de cada cachorro*/}
                <Match img={cachorros[index].foto} />
              </div>
            </div>
          )}
          {/* {cachorros.map((dog) => (
            <div className={`card ${isFlipped ? "flipped" : ""}`}>
              <div className={`card-inner ${showCard ? "front" : "back"}`}>
                {showCard ? (
                  <TinderCard
                    images={images}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    setCard={handleFlip}
                  />
                ) : (
                  <InfoCard
                    images={images}
                    nome={dog.nome}
                    idade={5}
                    raca={dog.raca.nomeRaca}
                    peso={dog.porte.tamanho}
                    cidade="Araxá"
                    setCard={handleFlip}
                    estado="MG"
                  />
                )}
                <Match img={images[0]} img2={images[1]} />
              </div>
            </div>
          ))} */}
        </>
      )}
    </div>
  );
}

export default Index;
