import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Composant Login pour gérer la connexion des utilisateurs
const Login = () => {
  // États pour stocker les valeurs du formulaire et les erreurs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Utilisation du contexte d'authentification et du hook de navigation
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  // Gestion de la soumission du formulaire de connexion
  const handleLogin = (e) => {
    e.preventDefault();
    try {
      // Récupération des utilisateurs depuis le localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      // Recherche de l'utilisateur correspondant aux identifiants fournis
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        // Si l'utilisateur est trouvé, on le connecte et on redirige vers la page d'accueil
        login(user.username); 
        navigate("/");
      } else {
        // Si l'utilisateur n'est pas trouvé, on affiche une erreur
        setError("Incorrect username or password.");
      }
    } catch {
      // En cas d'erreur inattendue, on affiche un message générique
      setError("Login Error.");
    }
  };

  // Rendu du composant
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {/* Affichage des messages d'erreur */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {/* Champ de saisie pour le nom d'utilisateur */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Champ de saisie pour le mot de passe */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Bouton de soumission du formulaire */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
