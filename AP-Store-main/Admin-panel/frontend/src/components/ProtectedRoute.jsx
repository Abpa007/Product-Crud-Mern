import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Rule 1: No token? Go to Login immediately.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Rule 2: Token exists? Render the component.
  // (We do NOT handle redirects to /products here. That belongs in App.jsx)
  return children ? children : <Outlet />;
};

export default ProtectedRoute;