// 🚀 CLEAN, PREMIUM E-COMMERCE CHECKOUT PAGE
// src/pages/Checkout.jsx

import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleContinueToPayment = () => {
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) {
      alert("Please fill all shipping details.");
      return;
    }
    navigate("/payment", {
      state: {
        shippingInfo,
        cartItems,
        totalAmount,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">
          🚚 Checkout - Shipping Details
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shippingInfo.name}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 rounded-lg p-3 transition"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 rounded-lg p-3 transition"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={shippingInfo.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 rounded-lg p-3 transition"
          />

          <button
            onClick={handleContinueToPayment}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-transform transform hover:scale-105 shadow"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
