// src/pages/Login.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  // ⚠️ DANGEROUS USE-EFFECT REMOVED
  // We removed the auto-redirect here to prevent infinite loops.
  // If a user lands here, let them log in manually.

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Dispatch Login
      const userData = await dispatch(login({ email, password })).unwrap();
      
      // 2. CRITICAL: Manually save token for ProtectedRoute
      // (Even if Redux saves it, this is a safety net for your Router)
      if (userData && userData.token) {
        localStorage.setItem("token", userData.token);
      }

      toast.success("Login successful!");
      
      // 3. Navigate using 'replace' to clear history
      navigate("/products", { replace: true });
      
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 sm:p-8 space-y-5"
      >
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-800">
          👋 Welcome Back
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            name="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"  // ✅ Fixes Browser Warning
            className="w-full border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 rounded-lg p-3 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password" // ✅ Fixes Browser Warning
            className="w-full border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 rounded-lg p-3 transition"
          />
        </div>

        {error && (
          <p className="text-center text-rose-600 text-sm font-medium">
            {typeof error === "string" ? error : "Login failed"}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-transform transform hover:scale-105 shadow ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;