// src/pages/CreateProducts.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateProducts() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !image) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("✅ Product created successfully!");
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      setPreview(null);
      navigate("/products");
    } catch (error) {
      alert("Error creating product");
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-slate-100 via-white to-slate-50 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        <h2 className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold text-center text-slate-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-slate-700 font-medium">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter product name"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-700 font-medium">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Enter price"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-700 font-medium">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition resize-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-700 font-medium">
              Upload Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 max-h-48 max-w-full rounded-lg object-cover shadow"
              />
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 rounded-lg text-white font-semibold shadow transition duration-200 ${
                loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-600"
              }`}
            >
              {loading ? "Creating Product..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProducts;
