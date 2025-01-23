import React from "react";
import AuthProvider from "./AuthContext";
import CartProvider from "./CartContext";

// Composant RootProvider pour combiner plusieurs providers
const RootProvider = ({ children }) => {
  return (
    // Provider pour l'authentification
    <AuthProvider>
      {/* Provider pour le panier */}
      <CartProvider>
        {/* Rendu des composants enfants */}
        {children}
      </CartProvider>
    </AuthProvider>
  );
};

export default RootProvider;
