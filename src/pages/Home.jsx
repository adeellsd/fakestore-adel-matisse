import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const categories = [
  { name: "All", href: "all" },
  { name: "Men's Clothing", href: "men's clothing" },
  { name: "Women's Clothing", href: "women's clothing" },
  { name: "Accessories", href: "jewelery" },
  { name: "Electronics", href: "electronics" },
];

function Example() {
  const navigate = useNavigate();
  const [categoriesWithImages, setCategoriesWithImages] = useState([]);

  useEffect(() => {
    const fetchCategoryImages = async () => {
      try {
        const updatedCategories = await Promise.all(
          categories.slice(1).map(async (category) => {
            const response = await fetch(
              `https://fakestoreapi.com/products/category/${category.href}`
            );
            const products = await response.json();
            return {
              ...category,
              imageSrc: products[0]?.image || "https://via.placeholder.com/300",
              description: `Explore our ${category.name} collection`,
            };
          })
        );
        setCategoriesWithImages(updatedCategories);
      } catch (error) {
        console.error("Error fetching category images:", error);
      }
    };

    fetchCategoryImages();
  }, []);

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Collections
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categoriesWithImages.map((category) => (
            <div
              key={category.name}
              className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/collection/${category.href}`)} 
            >
              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px]">
                <img
                  src={category.imageSrc}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-800 group-hover:text-indigo-600 text-center">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 text-center">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  return (
    <div className="bg-white py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 text-center">
          All Products
        </h2>
        <div className="flex justify-end mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categories.map((category) => (
              <option key={category.href} value={category.href}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-gray-50 rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-[250px]">
                <Link to={`/product/${product.id}`}> 
                  <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  <Link to={`/product/${product.id}`}>{product.title}</Link> 
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

function Home() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-center my-12 text-indigo-600">
        Welcome to our Fake Shop
      </h1>
      <Example />
      <ProductList />
    </div>
  );
}

export default Home;
