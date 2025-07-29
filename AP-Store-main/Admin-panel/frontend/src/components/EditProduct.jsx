import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔄 Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const p = res.data.data;
        setName(p.name);
        setPrice(p.price);
        setDescription(p.description || "");
        setImage(p.image);
      } catch {
        alert("Error fetching product.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price) {
      alert("Please fill in name and price.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    if (newImage) {
      formData.append("image", newImage);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ Product updated successfully!");
      navigate("/products");
    } catch (err) {
      alert("Update failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white backdrop-blur bg-opacity-90 w-full max-w-md p-8 rounded-2xl shadow-xl space-y-5"
      >
        <div className="flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-slate-800">Edit Product</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Product Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition resize-none"
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Upload New Image
            </label>
            <input
              type="file"
              onChange={(e) => setNewImage(e.target.files[0])}
              accept="image/*"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm transition"
            />
          </div>

          {image && (
            <div className="flex justify-center">
              <img
                src={`http://localhost:5000/uploads/${image}`}
                alt="Current"
                className="mt-3 max-h-40 rounded-lg object-contain shadow"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold text-white shadow transition ${
            loading
              ? "bg-emerald-300 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600"
          }`}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
