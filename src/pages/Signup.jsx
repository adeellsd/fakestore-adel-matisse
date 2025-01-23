import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Composant Signup pour gérer l'inscription des utilisateurs
const Signup = () => {
  // État local pour les données du formulaire et les messages d'erreur/succès
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  // Utilisation du contexte d'authentification et du hook de navigation
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestion de la soumission du formulaire d'inscription
  const handleSignup = (e) => {
    e.preventDefault();

    try {
      // Récupération des utilisateurs existants depuis le localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.find((u) => u.username === formData.username);

      // Vérification si l'utilisateur existe déjà
      if (userExists) {
        setError("Nom d'utilisateur déjà utilisé.");
        return;
      }

      // Ajout du nouvel utilisateur
      users.push({ username: formData.username, password: formData.password });
      localStorage.setItem("users", JSON.stringify(users));

      // Mise à jour de l'état pour afficher le message de succès
      setSuccess(true);

      // Connexion automatique et redirection vers la page d'accueil
      login(formData.username); 
      navigate("/"); 
    } catch (error) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  // Rendu du composant
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        {/* Affichage des messages d'erreur et de succès */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {success && (
          <div className="text-green-500 text-sm mb-4">
            Successful registration ! Redirecting...
          </div>
        )}
        {/* Champ de saisie pour le nom d'utilisateur */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Champ de saisie pour le mot de passe */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Bouton de soumission du formulaire */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
        >
          Signup!
        </button>
      </form>
    </div>
  );
};

export default Signup;
