// src/App.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

import Register from "./components/Register";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Checkout from "./components/Checkout";
import PaymentPage from "./components/PaymentPage";
import ThankYou from "./components/ThankYou";
import MyOrders from "./components/MyOrder";
import Footer from "./components/Footer";

import { hydrateCart } from "./store/CartSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const storedTotalQuantity =
      parseInt(localStorage.getItem("totalQuantity")) || 0;
    const storedTotalAmount =
      parseFloat(localStorage.getItem("totalAmount")) || 0;

    dispatch(
      hydrateCart({
        cartItems: storedCartItems,
        totalQuantity: storedTotalQuantity,
        totalAmount: storedTotalAmount,
      })
    );
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-center" />
      {/* Flex wrapper for full height layout */}
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        {/* Main content area that fills remaining space */}
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to="/products" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/thank-you"
              element={
                <ProtectedRoute>
                  <ThankYou />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
