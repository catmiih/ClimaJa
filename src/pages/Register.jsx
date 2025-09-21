import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await register(email, password, name);
      nav("/", { replace: true });
    } catch {
      setErr("Não foi possível criar a conta.");
    }
  };

  return (
    <div className="auth-wrap">
      <form onSubmit={onSubmit} className="auth-card">
        <h2>Criar conta</h2>
        <label>Usuário (opcional)</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
        />
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
        <button type="submit">Criar</button>

        <div className="auth-links">
          Já tem conta? <Link to="/login">Entrar</Link>
        </div>
        <div className="auth-links">
          <Link to="/">Voltar</Link>
        </div>
      </form>
    </div>
  );
}
