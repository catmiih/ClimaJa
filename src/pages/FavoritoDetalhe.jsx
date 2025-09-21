import { useEffect, useState } from "react";
import {
  getFavorite,
  removeFavorite,
  addFavorite,
  isFavorite,
} from "../services/favoritesService";
import { useNavigate, useParams } from "react-router-dom";
import { getForecast } from "../services/weatherService";
import WeatherCard from "../components/WeatherCard";
import MetricsRow from "../components/MetricsRow";

export default function FavoritoDetalhe() {
  const { id } = useParams();
  const nav = useNavigate();

  const [fav, setFav] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      const current = await getFavorite(id);
      if (!current) {
        nav("/favoritos");
        return;
      }
      setFav(current);

      // verifica se já está nos favoritos
      const exists = await isFavorite(current.name);
      setSaved(!!exists);

      const { forecast: fc } = await getForecast(current.name);
      setForecast(fc || []);
      setLoading(false);
    })();
  }, [id, nav]);

  const toggleFavorite = async () => {
    if (!fav) return;
    if (saved) {
      const exists = await isFavorite(fav.name);
      if (exists) {
        await removeFavorite(exists.id);
        setSaved(false);
      }
    } else {
      await addFavorite({ name: fav.name, region: fav.region });
      setSaved(true);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Carregando…</p>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>
          {fav.name}
          {fav.region ? `, ${fav.region}` : ""}
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => nav(`/favoritos/${id}/editar`)}
            style={{
              padding: ".5rem .8rem",
              borderRadius: 10,
              border: "1px solid #d0d7de",
              background: "#fff",
            }}
          >
            Editar
          </button>
          <button
            onClick={toggleFavorite}
            style={{
              padding: ".5rem .8rem",
              borderRadius: 10,
              border: saved ? "1px solid #ef4444" : "1px solid #0a66c2",
              background: saved ? "#ffecec" : "#e6f0ff",
              color: saved ? "#c00" : "#0a66c2",
              fontWeight: 600,
            }}
          >
            {saved ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
          </button>
        </div>
      </div>

      <div className="card-container">
        {forecast.map((day) => (
          <div className="card-stack" key={day.date}>
            <WeatherCard
              date={day.date}
              icon={day.day.condition.icon}
              temp={day.day.avgtemp_c}
              astro={day.astro}
            />
            <MetricsRow day={day} variant="weather" />
          </div>
        ))}
      </div>
    </div>
  );
}
