import Cookies from "js-cookie";
import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: Cookies.get("id"),
    nome: Cookies.get("nome"),
    token: Cookies.get("token"),
    profiles: [],
  });

  const changeProfile = (newProfile) => {
    setUser((prevUser) => ({
      ...prevUser,
      currentProfile: newProfile,
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, changeProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
