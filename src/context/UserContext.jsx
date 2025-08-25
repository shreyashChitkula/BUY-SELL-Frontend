import React, { createContext, lazy, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    contactNumber: -1,
    age:-1,
    firstName: "",
    lastName: "",
    id:"",
    loggedIn: false,
    profileImage:""
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
