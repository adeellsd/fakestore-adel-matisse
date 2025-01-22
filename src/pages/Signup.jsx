import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { login } = useContext(AuthContext); // Accès au contexte d'authentification
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Vérifier si l'utilisateur existe déjà dans localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.username === formData.username);

    if (userExists) {
      setError("Nom d'utilisateur déjà utilisé.");
      return;
    }

    // Ajouter l'utilisateur dans le localStorage
    users.push({ username: formData.username, password: formData.password });
    localStorage.setItem("users", JSON.stringify(users));
    setSuccess(true);

    // Connecter l'utilisateur automatiquement après l'inscription
    login("fakeToken123"); // Simule un token d'authentification

    // Rediriger vers la page d'accueil
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Inscription</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {success && (
          <div className="text-green-500 text-sm mb-4">
            Inscription réussie ! Redirection vers l'accueil...
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nom d'utilisateur</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Signup;
