import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminCredentials } from "../store/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // FIX 1: Check for 'token' instead of 'adminInfo' to match ProtectedRoute
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/products", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      if (!res.data.user.isAdmin) {
        alert("Access denied: Admins only.");
        setLoading(false);
        return;
      }

      const adminInfo = {
        name: res.data.user.name,
        email: res.data.user.email,
        isAdmin: res.data.user.isAdmin,
        token: res.data.token,
      };

      // --- CRITICAL FIX START ---
      // 1. Save the token explicitly so ProtectedRoute can find it
      localStorage.setItem("token", res.data.token);
      
      // 2. Save adminInfo for your Redux state/Profile
      localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
      // --- CRITICAL FIX END ---

      dispatch(setAdminCredentials(adminInfo));
      alert("✅ Login successful!");
      
      navigate("/products", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleLogin}
        className="bg-white backdrop-blur bg-opacity-90 w-full max-w-sm p-8 rounded-2xl shadow-xl space-y-6"
      >
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A9.003 9.003 0 0112 15c2.21 0 4.21.896 5.879 2.379M15 12h.01M9 12h.01"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-800">
          Admin Login
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          />
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;