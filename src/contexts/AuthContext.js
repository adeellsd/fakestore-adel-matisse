import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.auth);

  
  useEffect(() => {
    setIsAuthenticated(!!cookies.auth);
  }, [cookies.auth]);

  const login = (token) => {
    setCookie("auth", token, { path: "/", maxAge: 3600 }); 
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeCookie("auth");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
