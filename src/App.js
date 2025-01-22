import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";


function App() {
  return (
    <div>
      <Navbar />

      <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />

      </Routes>
      
    </div>
  );
}

export default App;
