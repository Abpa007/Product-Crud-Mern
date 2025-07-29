import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/CartSlice";

function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(res.data.data)) {
          setProducts(res.data.data);
        } else {
          setError("Invalid product data format.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load products. Please login again.");
        setTimeout(() => navigate("/login"), 2000);
      }
    };
    fetchProducts();
  }, [navigate]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center font-medium">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800">
        🛒 Browse Products
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition overflow-hidden flex flex-col"
            >
              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-base font-semibold text-gray-900 truncate">
                    {p.name}
                  </h2>
                  {p.description && (
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {p.description}
                    </p>
                  )}
                  <p className="text-green-600 font-bold text-lg mt-2">
                    ₹{p.price}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Free delivery in 3-5 days
                  </p>
                </div>
                <button
                  onClick={() => handleAddToCart(p)}
                  className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-1.5 rounded transition active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
