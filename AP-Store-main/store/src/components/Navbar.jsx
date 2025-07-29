import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useState, useEffect } from "react";
import CartSidebar from "./CartSidebar";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart.totalQuantity);

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    alert("Logged out");
    navigate("/login");
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setCartOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 text-lg sm:text-2xl font-bold bg-gradient-to-r from-emerald-500 to-green-400 text-transparent bg-clip-text hover:scale-105 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 9m5-9v9m6-9v9m-4-4h4"
              />
            </svg>
            Ap-Store
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex gap-5 items-center font-medium text-gray-700">
            {!userInfo ? (
              <>
                <Link
                  to="/register"
                  className="hover:text-emerald-500 transition"
                >
                  Register
                </Link>
                <Link to="/login" className="hover:text-emerald-500 transition">
                  Login
                </Link>
              </>
            ) : (
              <>
                <span className="text-emerald-600 font-semibold hidden md:block">
                  Hi, {userInfo?.user?.name?.split(" ")[0] || "User"}
                </span>
                <Link
                  to="/products"
                  className="hover:text-emerald-500 transition"
                >
                  Products
                </Link>
                <Link
                  to="/my-orders"
                  className="hover:text-emerald-500 transition"
                >
                  My Orders
                </Link>

                {/* Cart */}
                <button
                  onClick={() => setCartOpen(true)}
                  className="relative flex items-center gap-1 hover:text-emerald-500 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 9m5-9v9m6-9v9m-4-4h4"
                    />
                  </svg>
                  <span>Cart</span>
                  <span
                    className={`absolute -top-2 -right-3 text-xs font-bold px-1.5 py-0.5 rounded-full shadow ${
                      cartCount > 0
                        ? "bg-emerald-500 text-white animate-pulse"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {cartCount}
                  </span>
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-full text-sm shadow transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Hamburger for Mobile */}
          <button
            onClick={() => setMenuOpen(true)}
            className="sm:hidden flex flex-col gap-1"
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-gray-700"></span>
            <span className="block w-6 h-0.5 bg-gray-700"></span>
            <span className="block w-6 h-0.5 bg-gray-700"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-700">Menu</h2>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-4 p-4 text-gray-700 font-medium">
          {!userInfo ? (
            <>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/register"
                className="hover:text-emerald-500"
              >
                Register
              </Link>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/login"
                className="hover:text-emerald-500"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <span className="text-emerald-600 font-semibold">
                Hi, {userInfo?.user?.name?.split(" ")[0] || "User"}
              </span>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/products"
                className="hover:text-emerald-500"
              >
                Products
              </Link>
              <Link
                onClick={() => setMenuOpen(false)}
                to="/my-orders"
                className="hover:text-emerald-500"
              >
                My Orders
              </Link>
              <button
                onClick={() => {
                  setCartOpen(true);
                  setMenuOpen(false);
                }}
                className="hover:text-emerald-500 text-left"
              >
                Cart ({cartCount})
              </button>
              <button
                onClick={handleLogout}
                className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-full text-sm shadow mt-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        />
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default Navbar;
