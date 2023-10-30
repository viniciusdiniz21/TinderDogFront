import { createBrowserRouter, redirect } from "react-router-dom";
import Main from "../components/Main/Main";
import { Login } from "../components/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);
