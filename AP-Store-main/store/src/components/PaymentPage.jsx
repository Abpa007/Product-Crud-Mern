import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrder } from "../store/OrderSlice";
import { clearCart } from "../store/CartSlice";
import { useState } from "react";

const PaymentPage = () => {
  const { state } = useLocation();
  const { shippingInfo, cartItems, totalAmount } = state || {};
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!shippingInfo || !cartItems) {
    navigate("/checkout");
    return null;
  }

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    setLoading(true);
    try {
      await dispatch(
        createOrder({ cartItems, shippingInfo, totalAmount, paymentMethod })
      ).unwrap();
      dispatch(clearCart());
      navigate("/thank-you");
    } catch (error) {
      alert(error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        💳 Payment
      </h2>

      <div className="bg-white p-6 rounded-xl shadow space-y-5">
        <p className="text-lg text-gray-800 font-medium text-center">
          Total Amount:{" "}
          <span className="font-bold text-green-600 text-xl">
            ₹{totalAmount}
          </span>
        </p>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="accent-green-600"
            />
            <span className="text-gray-700">Cash on Delivery (COD)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="QR"
              checked={paymentMethod === "QR"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="accent-green-600"
            />
            <span className="text-gray-700">Pay via QR Code</span>
          </label>
        </div>

        {paymentMethod === "QR" && (
          <div className="text-center mt-4 space-y-2">
            <img
              src="/qr-code.jpg"
              alt="QR Code"
              className="w-40 h-40 mx-auto rounded shadow-sm"
            />
            <p className="text-sm text-gray-600">
              Scan the QR code and complete payment. Then send your receipt to
              <span className="font-semibold text-emerald-600">
                {" "}
                WhatsApp 9406969849{" "}
              </span>
              for confirmation.
            </p>
          </div>
        )}

        {paymentMethod === "COD" && (
          <p className="text-sm text-gray-600 mt-2 text-center">
            You will receive a confirmation message on your registered number
            after placing your COD order.
          </p>
        )}

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Placing Order..." : "Confirm and Place Order"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
