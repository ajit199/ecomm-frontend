import React, { createContext, useState } from "react";
import Cookies from "js-cookie";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const accessToken = Cookies.get("accessToken");
  const [userToken, setUserToken] = useState(accessToken || null);

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
