import * as React from "react";
import "./App.css";
import TinderCard from "./components/Card/Card";
import "glider-js/glider.min.css";
import Header from "./components/Header/Header";
import { ThemeProvider, createTheme } from "@mui/material";
import { ThemeOptions } from "./themes/theme";
import InfoCard from "./components/Card/CardInfo";

const theme = createTheme(ThemeOptions);

function App() {
  const [showCard, setShowCard] = React.useState(true);
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleLike = () => {
    // Lógica para lidar com o "like"
  };

  const handleDislike = () => {
    // Lógica para lidar com o "dislike"
  };

  const images = [
    "data:image/jpeg;base64,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",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAEiCFzfiCtDYZmo6oE-JSO4AMfu2arnpE3yecES_ZWKvGCqup0cONJudqrCh297pM5Gw&usqp=CAU",
    "https://s2-casaejardim.glbimg.com/C9xbzBCFi6q_jWnb7pvArghYREQ=/0x0:620x406/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_a0b7e59562ef42049f4e191fe476fe7d/internal_photos/bs/2023/H/S/dOjOeVROCN7L82fXV8bQ/japones-que-gastou-r-76-mil-para-se-tornar-um-cachorro-tem-dificuldade-para-fazer-amizade-com-caes-de-verdade1.jpeg",
  ];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowCard(!showCard);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
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
      </div>
    </ThemeProvider>
  );
}

export default App;
