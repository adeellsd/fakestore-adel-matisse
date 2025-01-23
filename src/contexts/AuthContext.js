import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

// Création du contexte d'authentification
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Utilisation du hook useCookies pour gérer les cookies
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  // État pour suivre si l'utilisateur est authentifié
  const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.auth);

  // Effet pour mettre à jour l'état d'authentification lorsque le cookie change
  useEffect(() => {
    setIsAuthenticated(!!cookies.auth);
  }, [cookies.auth]);

  // Fonction pour connecter l'utilisateur
  const login = (token) => {
    // Définir le cookie d'authentification avec une durée de vie de 1 heure
    setCookie("auth", token, { path: "/", maxAge: 3600 }); 
    setIsAuthenticated(true);
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    removeCookie("auth");
    setIsAuthenticated(false);
  };

  // Fournir le contexte avec les valeurs et fonctions nécessaires
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
