import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "./../styles/login.css";

export default function Login() {
  const nav = useNavigate();
  const { state } = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      nav(state?.from?.pathname || "/", { replace: true });
    } catch {
      setErr("Falha no login. Verifique e-mail e senha.");
    }
  };

  return (
    <div className="auth-wrap">
      <form onSubmit={onSubmit} className="auth-card">
        <h2>Entrar</h2>
        <label>E-mail</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
        />
        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
        />
        {err && <div className="error">{err}</div>}
        <button type="submit">Entrar</button>

        <div className="auth-links">
          Não tem conta? <Link to="/register">Criar conta</Link>
        </div>
        <div className="auth-links">
          <Link to="/">Voltar</Link>
        </div>
      </form>
    </div>
  );
}
