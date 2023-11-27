import * as React from "react";
import TinderCard from "../Card/Card";
import InfoCard from "../Card/CardInfo";
import Match from "../Match/Match";
import api from "../../services/api";
import { CircularProgress } from "@mui/material";
function Index() {
  const [showCard, setShowCard] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [cachorros, setCachorros] = React.useState([]);

  const handleLike = () => {
    // Lógica para lidar com o "like"
  };

  const handleDislike = () => {
    // Lógica para lidar com o "dislike"
  };

  React.useEffect(() => {
    handleDogs();
  }, []);

  const handleDogs = async () => {
    setLoading(true);
    try {
      const response = await api.get("Animal");
      console.log(response.data);
      setCachorros(response.data);
      return response;
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

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
          {cachorros.map((dog) => (
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
                {/*trocar para 1 foto de cada cachorro*/}
                <Match img={images[0]} img2={images[1]} />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Index;
