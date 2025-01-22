import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("auth"); 
    navigate("/login"); 
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-xl font-bold cursor-pointer">
          <span className="text-blue-400 pointer-events-none">FakeStore</span>
        </Link>

        
        <div className="flex items-center mx-4 flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full px-3 py-1.5 rounded-md bg-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        
        <div className="flex items-center space-x-4">

          {cookies.auth && (
            <Link
              to="/cart"
              className="bg-green-500 px-4 py-2 rounded-lg text-sm hover:bg-green-600 cursor-pointer"
            >
              <span className="pointer-events-none">Panier</span>
            </Link>
          )}

          {!cookies.auth ? (
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded-lg text-sm hover:bg-blue-600 cursor-pointer"
            >
              <span className="pointer-events-none">Connexion</span>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg text-sm hover:bg-red-600 cursor-pointer"
            >
              <span className="pointer-events-none">Déconnexion</span>
            </button>

          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
