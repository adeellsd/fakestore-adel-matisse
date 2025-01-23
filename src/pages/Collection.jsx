import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Composant Collection pour afficher les produits d'une catégorie spécifique
function Collection() {
  // État pour stocker les produits
  const [products, setProducts] = useState([]);
  // Récupération de la catégorie depuis l'URL
  const { category } = useParams();

  // Effet pour charger les produits de la catégorie
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Récupération des produits de la catégorie depuis l'API
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${category}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]); // L'effet se déclenche à chaque changement de catégorie

  // Rendu du composant
  return (
    <div className="bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        {/* Titre de la catégorie */}
        <h2 className="text-3xl font-bold text-indigo-600 capitalize mb-8">
          {category}
        </h2>
        {/* Grille des produits */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-gray-50 rounded-lg shadow-md overflow-hidden"
            >
              {/* Image du produit */}
              <div className="relative h-[250px]">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              </div>
              {/* Détails du produit */}
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  <Link to={`/product/${product.id}`}>
                    {product.title}
                  </Link>
                </h3>
                <p className="text-gray-500">{product.category}</p>
                <p className="text-indigo-600 font-bold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
