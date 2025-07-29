import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function DeleteProduct({ id, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("❌ You must be logged in to delete a product.");
      return;
    }

    if (window.confirm("⚠️ Are you sure you want to delete this product?")) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onDelete(id);
        toast.success("✅ Product deleted successfully!");
      } catch (err) {
        console.error("❌ Delete failed:", err);
        toast.error(
          err.response?.data?.message ||
            "Failed to delete product. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      aria-label="Delete product"
      title="Delete product"
      className={`flex items-center gap-2 px-3 py-1 rounded-full font-medium text-xs shadow transition ${
        loading
          ? "bg-red-300 text-white cursor-not-allowed"
          : "bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800"
      }`}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 7h12M10 11v6M14 11v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
        />
      </svg>
      <span>{loading ? "Deleting..." : "Delete"}</span>
    </button>
  );
}

export default DeleteProduct;
