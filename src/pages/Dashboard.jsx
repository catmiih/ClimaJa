import { useEffect, useState } from "react";
import { listFavorites as _listFavorites } from "../services/favoritesService";
import { getForecast as _getForecast } from "../services/weatherService";

export default function Dashboard({ services }) {
  const listFavorites = services?.listFavorites ?? _listFavorites;
  const getForecast = services?.getForecast ?? _getForecast;

  const [count, setCount] = useState(0);
  const [avg, setAvg] = useState(null);
  const [busy, setBusy] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setBusy(true);
      setErr("");
      try {
        const favs = await listFavorites();
        setCount(favs.length);

        if (favs.length === 0) {
          setAvg(null);
        } else {
          const sample = favs.slice(0, 3);
          const temps = [];
          for (const f of sample) {
            try {
              const { forecast } = await getForecast(f.name);
              const today = forecast?.[0]?.day?.avgtemp_c;
              if (typeof today === "number") temps.push(today);
            } catch {}
          }
          setAvg(
            temps.length
              ? Math.round(temps.reduce((a, b) => a + b, 0) / temps.length)
              : null
          );
        }
      } catch {
        setErr("Não foi possível carregar o resumo.");
      } finally {
        setBusy(false);
      }
    })();
  }, [listFavorites, getForecast]);

  return (
    <main
      id="main-content"
      aria-labelledby="dash-title"
      style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}
    >
      <h1 id="dash-title" style={{ marginBottom: "1rem" }}>
        Resumo
      </h1>

      {busy && (
        <p role="status" aria-live="polite">
          Calculando métricas…
        </p>
      )}
      {err && (
        <p role="alert" style={{ color: "#c00" }}>
          {err}
        </p>
      )}

      {!busy && !err && (
        <section aria-label="Indicadores" className="card-container">
          <article
            className="weather-card"
            role="group"
            aria-label="Total de favoritos"
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <h2 style={{ fontSize: "1rem", margin: 0 }}>Total de favoritos</h2>
            <div
              aria-live="polite"
              style={{ fontSize: "2rem", fontWeight: 800 }}
            >
              {count}
            </div>
          </article>

          <article
            className="weather-card"
            role="group"
            aria-label="Média de temperatura hoje (amostra)"
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <h2 style={{ fontSize: "1rem", margin: 0 }}>
              Média de hoje (até 3 cidades)
            </h2>
            <div
              aria-live="polite"
              style={{ fontSize: "2rem", fontWeight: 800 }}
            >
              {avg != null ? `${avg}°C` : "—"}
            </div>
          </article>
        </section>
      )}

      <p style={{ marginTop: "1rem", opacity: 0.8, fontSize: ".95rem" }}>
        Dica: adicione cidades em <strong>Favoritos</strong> para ver números
        mais completos.
      </p>
    </main>
  );
}
