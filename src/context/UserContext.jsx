import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: "",
    token: null,
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
