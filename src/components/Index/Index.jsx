import * as React from "react";
import TinderCard from "../Card/Card";
import InfoCard from "../Card/CardInfo";
function Index() {
  const [showCard, setShowCard] = React.useState(true);
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleLike = () => {
    // Lógica para lidar com o "like"
  };

  const handleDislike = () => {
    // Lógica para lidar com o "dislike"
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
              nome="Fido"
              idade={5}
              raca="Golden Retriever"
              peso={30}
              cidade="Araxá"
              setCard={handleFlip}
              estado="MG"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
