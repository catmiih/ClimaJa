import { useEffect, useState } from "react";
import {
  addFavorite,
  getFavorite,
  updateFavorite,
} from "../services/favoritesService";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/login.css";

export default function FavoritoForm() {
  const nav = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const current = await getFavorite(id);
      if (!current) {
        nav("/favoritos");
        return;
      }
      setName(current.name || "");
      setRegion(current.region || "");
    })();
  }, [id, isEdit, nav]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      if (!name.trim()) {
        setErr("Informe o nome da cidade.");
        return;
      }
      if (isEdit)
        await updateFavorite(id, { name: name.trim(), region: region.trim() });
      else await addFavorite({ name: name.trim(), region: region.trim() });
      nav("/favoritos", { replace: true });
    } catch {
      setErr("Falha ao salvar.");
    }
  };

  return (
    <div className="auth-wrap">
      <form onSubmit={onSubmit} className="auth-card" style={{ minWidth: 320 }}>
        <h2>{isEdit ? "Editar cidade" : "Nova cidade"}</h2>

        <label>Cidade *</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex.: Praia Grande"
        />

        <label>Região/Estado (opcional)</label>
        <input
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="SP"
        />

        {err && <div className="error">{err}</div>}

        <button type="submit">{isEdit ? "Salvar" : "Adicionar"}</button>
        <button
          type="button"
          onClick={() => nav("/favoritos")}
          style={{
            background: "#fff",
            border: "1px solid #d0d7de",
            color: "#111",
          }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
