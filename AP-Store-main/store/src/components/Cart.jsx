import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/CartSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Removed from cart ✅");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared ✅");
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-10 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 text-center text-gray-800">
        🛒 Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-600 text-base sm:text-lg mb-4">
            Your cart is empty.
          </p>
          <Link
            to="/products"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg text-base sm:text-lg font-semibold transition-transform transform hover:scale-105"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-5">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl shadow hover:shadow-lg transition-transform transform hover:scale-[1.01]"
            >
              {/* Product Image */}
              <div className="flex-shrink-0 flex justify-center">
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt={item.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-lg border"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-1 text-center sm:text-left space-y-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-gray-700">
                  <span className="font-medium">Price:</span> ₹{item.price}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Quantity:</span> {item.quantity}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Subtotal:</span> ₹
                  {item.price * item.quantity}
                </p>
              </div>

              {/* Remove Button */}
              <div className="flex justify-center sm:justify-end">
                <button
                  onClick={() => handleRemove(item._id)}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-transform transform hover:scale-105"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total and Actions */}
          <div className="text-center sm:text-right mt-8 space-y-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              Total: ₹{totalAmount}
            </h3>

            <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3">
              <button
                onClick={handleClearCart}
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-medium transition-transform transform hover:scale-105"
              >
                Empty Cart
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-base sm:text-lg font-semibold transition-transform transform hover:scale-105"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
