// src/PaginaDeChat.js
import * as React from "react";
import Mensagem from "./Mensagem";
import MenuLateral from "./MenuLateral";
import { styled } from "@mui/system";
import { UserContext } from "../../context/UserContext";
import api from "../../services/api";
import Card from "@mui/material/Card";

const ContentContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const Mensagens = () => {
  const [conversaSelecionada, setConversaSelecionada] = React.useState(null);

  const [match, setMatch] = React.useState([]);
  const [animaisMatch, setAnimaisMatch] = React.useState([]);
  const [listaMatches, setListaMatches] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { user, setUser } = React.useContext(UserContext);

  function combinarMatchesComAnimais(matches, listaAnimais) {
    // Função auxiliar para obter o Animal com base no ID
    function obterAnimalPorId(animalId) {
      return listaAnimais.find((animal) => animal.id === animalId);
    }

    // Função principal que combina matches com animais
    const listaCombinada = matches.map((match) => {
      const outroAnimal =
        user.profile.id == match.cachorro1
          ? obterAnimalPorId(match.cachorro2)
          : obterAnimalPorId(match.cachorro1);

      return {
        match,
        outroAnimal,
      };
    });

    return listaCombinada;
  }

  const handleAnimais = async () => {
    setLoading(true);
    try {
      const response = await api.get("Animal");
      setAnimaisMatch(response.data);
      return response;
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleMatchs = async () => {
    setLoading(true);
    try {
      const response = await api.get("Match");
      const matchs = response.data.filter(
        (mat) =>
          mat.cachorro1 == user.profile.id || mat.cachorro2 == user.profile.id
      );
      setMatch(matchs);
      return response;
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleAnimais();
    handleMatchs();
  }, []);

  React.useEffect(() => {
    if (match != [] && animaisMatch != []) {
      const resultado = combinarMatchesComAnimais(match, animaisMatch);
      setListaMatches(resultado);
    }
  }, [match, animaisMatch]);

  const selecionarConversa = (index) => {
    setConversaSelecionada(index);
  };
  return (
    <ContentContainer>
      {listaMatches.length > 0 ? (
        <>
          <MenuLateral
            conversas={listaMatches}
            conversaSelecionada={conversaSelecionada}
            selecionarConversa={selecionarConversa}
          />
          <div>
            {conversaSelecionada !== null && listaMatches.length > 0 && (
              <Mensagem
                nome={listaMatches[conversaSelecionada].outroAnimal?.nome}
                foto={listaMatches[conversaSelecionada].outroAnimal?.foto}
                mensagens={listaMatches[conversaSelecionada].match?.mensagens}
                matchId={listaMatches[conversaSelecionada].match?.id}
                idCachorro={listaMatches[conversaSelecionada].outroAnimal?.id}
              />
            )}
          </div>
        </>
      ) : (
        <Card sx={{ minWidth: 275, p: 8 }}> Nenhum Match no momento...</Card>
      )}
    </ContentContainer>
  );
};

export default Mensagens;
