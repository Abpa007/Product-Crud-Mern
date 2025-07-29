import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAdmin } from "../store/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminInfo = useSelector((state) => state.auth?.adminInfo);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    alert("Logged out");
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-80 backdrop-blur shadow h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-lg sm:text-xl font-bold text-slate-800 hover:text-emerald-500 transition"
          >
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
            MyApp Admin
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            className="sm:hidden focus:outline-none text-slate-700 hover:text-emerald-500 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Links */}
          <div className="hidden sm:flex items-center space-x-5 text-sm font-medium">
            {adminInfo ? (
              <>
                <span className="text-emerald-600 font-semibold">
                  Welcome, {adminInfo.name}
                </span>
                <Link
                  to="/products"
                  className="text-slate-700 hover:text-emerald-500 transition"
                >
                  Products
                </Link>
                <Link
                  to="/orders"
                  className="text-slate-700 hover:text-emerald-500 transition"
                >
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-md shadow transition text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-slate-700 hover:text-emerald-500 transition"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-emerald-500 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay when menu open */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
        ></div>
      )}

      {/* Mobile Slide-in Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white rounded-l-2xl shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50 flex flex-col p-5 space-y-4 sm:hidden`}
      >
        {adminInfo ? (
          <>
            <span className="text-emerald-600 font-semibold">
              Welcome, {adminInfo.name}
            </span>
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:scale-[1.02] active:scale-[0.98] transition text-slate-700"
            >
              Products
            </Link>
            <Link
              to="/orders"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:scale-[1.02] active:scale-[0.98] transition text-slate-700"
            >
              Orders
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white hover:scale-[1.02] active:scale-[0.98] transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:scale-[1.02] active:scale-[0.98] transition text-slate-700"
            >
              Register
            </Link>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:scale-[1.02] active:scale-[0.98] transition text-slate-700"
            >
              Login
            </Link>
          </>
        )}
      </div>

      {/* Spacer to prevent content hidden under navbar */}
      <div className="mt-16"></div>
    </>
  );
}

export default Navbar;
