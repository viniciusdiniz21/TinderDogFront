import Cookies from "js-cookie";
import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  let animalJson = localStorage.getItem("animal");
  let animal = JSON.parse(animalJson);

  const [user, setUser] = useState({
    id: Cookies.get("id"),
    nome: Cookies.get("nome"),
    token: Cookies.get("token"),
    animalid: Cookies.get("idanimal"),
    animal: animal.animal,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
