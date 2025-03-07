import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

// Composant Cart pour afficher et gérer le panier
const Cart = () => {
  // Utilisation du contexte du panier pour accéder aux fonctions et données
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Calcul du total du panier
  const total = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        // Affichage si le panier est vide
        <p>Your cart is empty.</p>
      ) : (
        // Affichage du contenu du panier
        <div className="space-y-6">
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b pb-4"
            >
              {/* Informations du produit */}
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-gray-500">{product.price} €</p>
                </div>
              </div>
              {/* Contrôles de quantité et suppression */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateQuantity(product.id, product.quantity - 1)}
                  disabled={product.quantity === 1}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, product.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {/* Affichage du total */}
          <div className="text-right">
            <p className="text-xl font-bold">Total : {total.toFixed(2)} €</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
