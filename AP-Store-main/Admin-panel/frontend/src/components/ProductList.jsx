// src/components/ProductList.jsx

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import DeleteProduct from "./DeleteProduct";

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Remove deleted product from UI instantly
  const removeProductFromUI = (id) => {
    setProducts((prev) => prev.filter((product) => product._id !== id));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(res.data.data)) {
          setProducts(res.data.data);
          setError("");
        } else {
          setError("Unexpected data format from server.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load products. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [navigate]);

  if (loading) {
    return (
      <p className="text-center text-emerald-600 font-semibold p-4 animate-pulse">
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 font-semibold p-4">{error}</p>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          🛍️ All Products
        </h1>
        <Link
          to="/products/create"
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition shadow"
        >
          ➕ Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-slate-500 italic mt-10 text-lg">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col"
            >
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded-xl mb-3"
              />
              <h2 className="text-lg sm:text-xl font-semibold text-slate-800 line-clamp-1">
                {product.name}
              </h2>

              <p className="text-emerald-600 font-medium mt-2">
                ₹{product.price}
              </p>

              {product.description && (
                <div className="mt-2">
                  <p className="text-slate-700 text-sm font-semibold mb-1">
                    Description:
                  </p>
                  <p className="text-slate-600 text-sm italic line-clamp-3">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="mt-auto flex justify-between items-center text-sm pt-4">
                <Link
                  to={`/products/edit/${product._id}`}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536M9 11l6.586-6.586a2 2 0 112.828 2.828L11.828 14H9v-2.828z"
                    />
                  </svg>
                  Edit
                </Link>

                <DeleteProduct
                  id={product._id}
                  onDelete={removeProductFromUI}
                  customClass="text-red-600 hover:text-red-800 font-medium transition flex items-center gap-1"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
