import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

export default function Logout() {
  const nav = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      await logout();
      nav("/login", { replace: true });
    };
    doLogout();
  }, [nav]);

  return <p style={{ textAlign: "center", marginTop: "2rem" }}>Saindo...</p>;
}
