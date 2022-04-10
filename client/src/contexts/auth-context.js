import React, { useState, useContext, createContext } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token") ?? null;
  const [isUser, setIsUser] = useState(() => {
    if (token) {
      return jwt_decode(token);
    } else return false;
  });

  const exists = () => {
    console.log(`user details:`, isUser);
    if (isUser) {
      if (Number(isUser.exp) > Number(Date.now())) {
        alert("token expired");
        localStorage.removeItem("token");
        return false;
      } else return isUser;
    }
    return false;
  };

  // console.log("does it exist", exists());

  return (
    <AuthContext.Provider value={{ isUser, setIsUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
