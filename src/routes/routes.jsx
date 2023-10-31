import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Main/Main";
import { Login } from "../components/Login/Login";
import Mensagens from "../components/Mensagens/Mensagens";
import Index from "../components/Index/Index";
import CadastroCachorro from "../components/CadastroCachorro/CadastroCachorro";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      ,
      {
        path: "mensagens",
        element: <Mensagens />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "cadastro",
    element: <CadastroCachorro />,
  },
]);
