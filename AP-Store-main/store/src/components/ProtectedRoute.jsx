import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (token && window.location.pathname === "/") {
    return <Navigate to={"/products"} />;
  } else {
    return token ? children : <Navigate to={"/login"} />;
  }
}

export default ProtectedRoute;
