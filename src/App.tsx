import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import ProductsList from "./components/ProductsList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/carts";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
