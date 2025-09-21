import { useEffect, useState } from "react";
import {
  listFavorites as _listFavorites,
  removeFavorite as _removeFavorite,
} from "../services/favoritesService";
import { Link, useNavigate } from "react-router-dom";

export default function Favoritos({ services }) {
  const listFavorites = services?.listFavorites ?? _listFavorites;
  const removeFavorite = services?.removeFavorite ?? _removeFavorite;

  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  const load = async () => {
    setBusy(true);
    try {
      setItems(await listFavorites());
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("Remover esta cidade favorita?")) return;
    await removeFavorite(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ margin: 0 }}>Favoritos</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={async () => {
              const data = await listFavorites();
              const evt = new CustomEvent("EXPORT_FAVORITOS", { detail: data });
              window.dispatchEvent(evt);
            }}
            aria-label="Exportar CSV"
            style={{
              padding: ".5rem .8rem",
              borderRadius: 10,
              border: "1px solid #d0d7de",
              background: "#fff",
            }}
          >
            Exportar CSV
          </button>
          <button
            onClick={() => nav("/favoritos/novo")}
            style={{
              padding: ".5rem .8rem",
              borderRadius: 10,
              border: 0,
              background: "#0a66c2",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            Adicionar
          </button>
        </div>
      </div>

      {busy && <p>Carregando…</p>}
      {!busy && items.length === 0 && <p>Nenhuma cidade favorita ainda.</p>}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: 8,
        }}
      >
        {items.map((it) => (
          <li
            key={it.id}
            role="listitem"
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: ".8rem 1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>{it.name}</div>
              <div style={{ opacity: 0.7, fontSize: 14 }}>
                {it.region || "—"}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Link
                to={`/favoritos/${it.id}`}
                style={{ textDecoration: "none" }}
              >
                <button
                  style={{
                    padding: ".45rem .7rem",
                    borderRadius: 10,
                    border: "1px solid #d0d7de",
                    background: "#fff",
                  }}
                >
                  Detalhes
                </button>
              </Link>
              <Link
                to={`/favoritos/${it.id}/editar`}
                style={{ textDecoration: "none" }}
              >
                <button
                  style={{
                    padding: ".45rem .7rem",
                    borderRadius: 10,
                    border: "1px solid #d0d7de",
                    background: "#fff",
                  }}
                >
                  Editar
                </button>
              </Link>
              <button
                onClick={() => onDelete(it.id)}
                aria-label="Excluir"
                style={{
                  padding: ".45rem .7rem",
                  borderRadius: 10,
                  border: "1px solid #ef4444",
                  background: "#fff",
                  color: "#ef4444",
                }}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
