import Cookies from "js-cookie";
import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: Cookies.get("id"),
    nome: Cookies.get("nome"),
    token: Cookies.get("token"),
    animalid: Cookies.get("idanimal"),
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
