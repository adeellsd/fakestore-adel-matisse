import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

const Navbar = () => {
  // Utilisation des contextes d'authentification et de panier
  const { isAuthenticated, logout } = useContext(AuthContext); 
  const { cart } = useContext(CartContext); 
  const navigate = useNavigate();

  // Calcul du nombre total d'articles dans le panier
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo et lien vers la page d'accueil */}
        <Link to="/" className="text-xl font-bold text-blue-400">
          FakeStore-A.M
        </Link>

        {/* Liens de navigation */}
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              {/* Lien vers le panier avec le nombre d'articles */}
              <Link
                to="/cart"
                className="flex items-center space-x-2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
              >
                <span>Cart</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              </Link>

              {/* Bouton de déconnexion */}
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Lien d'inscription */}
              <Link
                to="/signup"
                className="bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Signup
              </Link>

              {/* Lien de connexion */}
              <Link
                to="/login"
                className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
