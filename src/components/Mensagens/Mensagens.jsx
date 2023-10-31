// src/PaginaDeChat.js
import * as React from "react";
import Mensagem from "./Mensagem";
import MenuLateral from "./MenuLateral";
import { styled } from "@mui/system";

const ContentContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

const Mensagens = () => {
  const [conversaSelecionada, setConversaSelecionada] = React.useState(0);
  const conversas = [
    {
      nome: "Cachorro",
      foto: "https://s2-casaejardim.glbimg.com/C9xbzBCFi6q_jWnb7pvArghYREQ=/0x0:620x406/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_a0b7e59562ef42049f4e191fe476fe7d/internal_photos/bs/2023/H/S/dOjOeVROCN7L82fXV8bQ/japones-que-gastou-r-76-mil-para-se-tornar-um-cachorro-tem-dificuldade-para-fazer-amizade-com-caes-de-verdade1.jpeg",
      mensagens: [
        { texto: "Oi!", tipo: "enviada" },
        { texto: "Como vai?", tipo: "enviada" },
        { texto: "Oi!", tipo: "recebida" },
        { texto: "Como vai?", tipo: "recebida" },
        {
          texto:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
          tipo: "enviada",
        },
      ],
    },
    {
      nome: "Cachorro 2",
      foto: "https://s2-casaejardim.glbimg.com/C9xbzBCFi6q_jWnb7pvArghYREQ=/0x0:620x406/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_a0b7e59562ef42049f4e191fe476fe7d/internal_photos/bs/2023/H/S/dOjOeVROCN7L82fXV8bQ/japones-que-gastou-r-76-mil-para-se-tornar-um-cachorro-tem-dificuldade-para-fazer-amizade-com-caes-de-verdade1.jpeg",
      mensagens: [
        { texto: "Olá!", tipo: "recebida" },
        { texto: "Tudo bem?", tipo: "recebida" },
      ],
    },
  ];

  const selecionarConversa = (index) => {
    setConversaSelecionada(index);
  };

  return (
    <ContentContainer>
      <MenuLateral
        conversas={conversas}
        conversaSelecionada={conversaSelecionada}
        selecionarConversa={selecionarConversa}
      />
      <div>
        {conversaSelecionada !== null && (
          <Mensagem
            nome={conversas[conversaSelecionada].nome}
            foto={conversas[conversaSelecionada].foto}
            mensagens={conversas[conversaSelecionada].mensagens}
          />
        )}
      </div>
    </ContentContainer>
  );
};

export default Mensagens;
