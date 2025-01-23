import React, { createContext, useState, useEffect } from "react";

// Création du contexte pour le panier
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // État pour stocker les articles du panier
  const [cart, setCart] = useState([]);

  // Effet pour charger le panier depuis le localStorage au montage du composant
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Effet pour sauvegarder le panier dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Si le produit existe déjà, augmenter sa quantité
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Sinon, ajouter le nouveau produit avec une quantité de 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Fonction pour retirer un produit du panier
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Fonction pour mettre à jour la quantité d'un produit dans le panier
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Fournir le contexte avec les valeurs et fonctions nécessaires
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
