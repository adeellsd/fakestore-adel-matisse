import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-400">
          MyShop
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="bg-green-500 px-4 py-2 rounded-lg">
                Panier
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-red-500 px-4 py-2 rounded-lg"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                S'inscrire
              </Link>
              <Link
                to="/login"
                className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Connexion
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
