import { createBrowserRouter, redirect } from "react-router-dom";
import Main from "../components/Main/Main";
import { Login } from "../components/Login/Login";
import Mensagens from "../components/Mensagens/Mensagens";
import Index from "../components/Index/Index";
import CadastroCachorro from "../components/CadastroCachorro/CadastroCachorro";
import Cookies from "js-cookie";
import Raca from "../components/Raca/Raca";

function loaderAuthenticacao() {
  let auth = Cookies.get("access_token");
  if (auth) {
    return true;
  } else {
    return redirect("/login");
  }
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: loaderAuthenticacao,
    children: [
      {
        index: true,
        loader: loaderAuthenticacao,
        element: <Index />,
      },
      ,
      {
        path: "mensagens",
        loader: loaderAuthenticacao,
        element: <Mensagens />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
    loader: () => {
      let tkn = Cookies.get("access_token");
      let auth = tkn ? true : false;
      if (auth) {
        return redirect("../");
      }
      return auth;
    },
  },
  {
    path: "cadastrar",
    loader: loaderAuthenticacao,
    element: <CadastroCachorro />,
  },
  {
    path: "raca",
    loader: loaderAuthenticacao,
    element: <Raca />,
  },
]);
