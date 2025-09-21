import { Navigate, useLocation } from "react-router-dom";
import { currentUser } from "../services/authService";

export default function ProtectedRoute({ children }) {
  const user = currentUser();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}
