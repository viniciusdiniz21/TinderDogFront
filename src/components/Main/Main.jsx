import * as React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Main;
