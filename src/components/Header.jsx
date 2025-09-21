import { NavLink } from "react-router-dom";
import "./Header.css";
import { onAuth } from "../services/authService";
import { useEffect, useState } from "react";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuth((u) => setUser(u));
    return () => unsub && unsub();
  }, []);

  return (
    <header className="hdr" role="banner">
      <a href="#main-content" className="skip-link">
        Pular para conteúdo
      </a>

      <div className="brand">ClimaJá+</div>

      <nav className="nav" role="navigation" aria-label="Principal">
        <NavLink to="/" className="link">
          Início
        </NavLink>
        <NavLink to="/sobre" className="link">
          Sobre
        </NavLink>
        <NavLink to="/favoritos" className="link">
          Favoritos
        </NavLink>
        <NavLink to="/dashboard" className="link">
          Resumo
        </NavLink>
        {user ? (
          <NavLink to="/logout" className="link">
            Sair
          </NavLink>
        ) : (
          <NavLink to="/login" className="link">
            Entrar
          </NavLink>
        )}
      </nav>
    </header>
  );
}
