import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert("Veuillez vous connecter pour ajouter des produits au panier.");
      navigate("/login"); 
      return;
    }

    addToCart(product); 
    alert("Produit ajouté au panier !");
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav className="text-sm py-4 px-6 bg-gray-100">
          <Link to="/" className="text-indigo-600 hover:underline">
            Home
          </Link>{" "}
          /{" "}
          <Link
            to={`/collection/${product.category}`}
            className="text-indigo-600 hover:underline"
          >
            {product.category}
          </Link>
        </nav>
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img
              src={product.image}
              alt={product.title}
              className="w-full rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {product.title}
              </h1>
              <p className="text-gray-600 mt-4">{product.description}</p>
              <p className="text-2xl font-bold text-indigo-600 mt-6">
                ${product.price}
              </p>
              <button
                onClick={handleAddToCart}
                className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
