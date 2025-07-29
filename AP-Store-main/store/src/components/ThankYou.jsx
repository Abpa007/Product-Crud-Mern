import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-emerald-50 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-600 mb-4">
        🎉 Thank You!
      </h1>
      <p className="text-gray-700 text-lg sm:text-xl max-w-md mb-6">
        Your order has been placed successfully. We appreciate your purchase and
        will process your order shortly.
      </p>
      <button
        onClick={() => navigate("/products")}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full shadow transition"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default ThankYou;
