import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/CartSlice";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function CartSidebar({ isOpen, onClose }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => dispatch(removeFromCart(id));
  const handleClear = () => dispatch(clearCart());
  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-80 sm:w-96 h-full bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50 flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} aria-label="Close Cart">
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-center mt-10">
              Your cart is empty.
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-3 items-center border rounded p-2"
              >
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t space-y-2">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>₹{totalAmount}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded transition"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={handleClear}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded transition"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
        ></div>
      )}
    </>
  );
}
