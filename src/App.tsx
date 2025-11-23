import { Routes, Route } from "react-router-dom";
import {  lazy } from "react";
import Navbar from "./components/navbar";
const ProductsList = lazy(() => import("./components/ProductsList"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const Cart = lazy(() => import("./components/carts"));
const NotFound = lazy(() => import("./components/NotFound"));
const ContactUs = lazy(() => import("./components/ContactUs"));

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contact" element={<ContactUs />} />

      </Routes>
    </>
  );
}

export default App;
