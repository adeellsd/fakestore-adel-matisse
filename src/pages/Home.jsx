import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const categories = [
  { name: "All", href: "all" },
  { name: "Men's Clothing", href: "men's clothing" },
  { name: "Women's Clothing", href: "women's clothing" },
  { name: 'Accessories', href: 'jewelery' },
  { name: 'Electronics', href: 'electronics' }
];

function Example() {
  const navigate = useNavigate();
  const [categoriesWithImages, setCategoriesWithImages] = useState([]);

  useEffect(() => {
    const fetchCategoryImages = async () => {
      try {
        const updatedCategories = await Promise.all(categories.slice(1).map(async (category) => {
          const response = await fetch(`https://fakestoreapi.com/products/category/${category.href}`);
          const products = await response.json();
          return {
            ...category,
            imageSrc: products[0]?.image || 'https://via.placeholder.com/300',
            description: `Explore our ${category.name} collection`
          };
        }));
        setCategoriesWithImages(updatedCategories);
      } catch (error) {
        console.error('Error fetching category images:', error);
      }
    };

    fetchCategoryImages();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {categoriesWithImages.map((category) => (
              <div
                key={category.name}
                className="group relative cursor-pointer"
                onClick={() => navigate(`/collection/${category.href}`)}
              >
                <img
                  alt={category.name}
                  src={category.imageSrc}
                  className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-[2/1] lg:aspect-square"
                />
                <h3 className="mt-6 text-sm text-gray-500">
                  {category.name}
                </h3>
                <p className="text-base font-semibold text-gray-900">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">All Products</h2>
        
        <div className="mt-4 mb-8">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {categories.map((category) => (
              <option key={category.href} value={category.href}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/product/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
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
      <h1 className="text-3xl font-bold text-center my-8">Bienvenue sur MyShop</h1>
      <Example />
      <ProductList />
    </div>
  );
}

export default Home;
