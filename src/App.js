//On importe les modules et composants nécessaires
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Collection from './pages/Collection';


import RootProvider from "./contexts/RootProvider";


function App() {
  return (
    <RootProvider>

        <div>

          <Navbar />

          <Routes>
            {/* On définit les routes de l'application */}
              <Route path="/" element={<Home />} />
              <Route path="/collection/:category" element={<Collection />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

          </Routes>
          
        </div>

    </RootProvider>    
  );
}

export default App;
