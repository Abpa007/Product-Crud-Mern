import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-emerald-700 text-emerald-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Quick Links */}
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm font-medium">
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/my-orders", label: "My Orders" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:underline hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-xs sm:text-sm text-emerald-100">
          © {new Date().getFullYear()} Ap-Store. All rights reserved. <br />
          Made with ❤️ by{" "}
          <span className="font-semibold text-white">Abhay Panchal</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
