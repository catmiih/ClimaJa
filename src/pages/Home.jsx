import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { getForecast } from "../services/weatherService";
import { Link, useNavigate } from "react-router-dom";
import MetricsRow from "../components/MetricsRow";
import SwipeDays from "../components/SwipeDays";
import PullToRefresh from "../components/PullToRefresh";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  findFavoriteByName,
  toggleFavoriteByName,
} from "../services/favoritesService";
import { currentUser } from "../services/authService";

export default function Home({ fetchForecast = getForecast }) {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [idx, setIdx] = useState(0);
  const [saved, setSaved] = useState(false);
  const [favBusy, setFavBusy] = useState(false);
  const nav = useNavigate();

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;

  const refreshForecast = async (query) => {
    const q = (query ?? city)?.toString().trim();
    if (!q || q.length < 3) return;

    setLoading(true);
    setError("");
    try {
      const { forecast: fc, location: loc } = await fetchForecast(q);
      setForecast(fc || []);
      setLocation(loc || null);
      setCity(loc?.name || q);
      setIdx(0);
      localStorage.setItem("lastCity", q);
    } catch (e) {
      console.error("Erro ao buscar previsão:", e);
      setError("Não foi possível carregar a previsão.");
      setForecast([]);
      setLocation(null);
    } finally {
      setLoading(false);
    }
  };

  // restaura última cidade
  useEffect(() => {
    const last = localStorage.getItem("lastCity");
    if (last && last.length >= 3) {
      refreshForecast(last);
    }
  }, []);

  // geolocalização automática
  useEffect(() => {
    if (!navigator.geolocation) return;

    const alreadySet = localStorage.getItem("lastCity");
    if (alreadySet) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = `${latitude},${longitude}`;
        refreshForecast(coords);
      },
      (err) => {
        console.log("Geo negada/falhou:", err?.message || err);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  // debounce da busca manual
  useEffect(() => {
    if (city.length >= 3) {
      const t = setTimeout(() => refreshForecast(city), 300);
      return () => clearTimeout(t);
    } else {
      setForecast([]);
      setLocation(null);
      setError("");
    }
  }, [city]);

  // checar se a cidade já está nos favoritos (somente se logado)
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        if (!location?.name || !currentUser()) {
          setSaved(false);
          return;
        }
        const exists = await findFavoriteByName(location.name);
        if (!ignore) setSaved(!!exists);
      } catch {
        if (!ignore) setSaved(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [location]);

  const handleToggleFavorite = async () => {
    if (!location?.name) return;

    // exige login
    if (!currentUser()) {
      nav("/login", { replace: true, state: { from: { pathname: "/" } } });
      return;
    }

    setFavBusy(true);
    try {
      const { saved: nowSaved } = await toggleFavoriteByName({
        name: location.name,
        region: location.region || "",
      });
      setSaved(nowSaved);
    } catch (e) {
      if (
        e?.code === "AUTH_REQUIRED" ||
        /AUTH_REQUIRED|Usuário/i.test(String(e?.message))
      ) {
        nav("/login", { replace: true, state: { from: { pathname: "/" } } });
      } else {
        console.error(e);
        setError("Não foi possível atualizar seus favoritos agora.");
      }
    } finally {
      setFavBusy(false);
    }
  };

  return (
    <main id="main-content" aria-labelledby="home-title">
      <SearchBar onSearch={setCity} />

      {location && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: "1rem",
          }}
        >
          <h2
            id="home-title"
            style={{ margin: 0, color: "#333", textAlign: "center" }}
          >
            Clima em {location.name}
            {location.region ? `, ${location.region}` : ""}
          </h2>

          <button
            onClick={handleToggleFavorite}
            disabled={!!favBusy}
            aria-label={
              saved ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
            title={saved ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 4,
              transform: favBusy ? "scale(0.95)" : "none",
            }}
          >
            {saved ? (
              <AiFillStar
                size={22}
                color="#f5b301"
                aria-hidden="true"
                focusable="false"
              />
            ) : (
              <AiOutlineStar
                size={22}
                color="#f5b301"
                aria-hidden="true"
                focusable="false"
              />
            )}
          </button>
        </div>
      )}

      {loading && (
        <p role="status" aria-live="polite" style={{ textAlign: "center" }}>
          Carregando previsão...
        </p>
      )}

      {error && (
        <p
          role="alert"
          aria-live="assertive"
          style={{ textAlign: "center", marginTop: "0.5rem", color: "#c00" }}
        >
          {error}
        </p>
      )}

      {!loading && forecast.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "2rem", opacity: 0.7 }}>
          Pesquise uma cidade para ver o clima ☀️
        </p>
      )}

      <div className="climaLst">
        <PullToRefresh onRefresh={refreshForecast}>
          {isMobile ? (
            forecast[idx] && (
              <SwipeDays
                index={idx}
                setIndex={setIdx}
                max={forecast.length - 1}
              >
                <div
                  className="card-container"
                  style={{ justifyContent: "center" }}
                >
                  <div className="card-stack" key={forecast[idx].date}>
                    <Link
                      className="card-link"
                      to={`/detalhes/${forecast[idx].date}`}
                      state={{ day: forecast[idx] }}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <WeatherCard
                        date={forecast[idx].date}
                        icon={forecast[idx].day.condition.icon}
                        temp={forecast[idx].day.avgtemp_c}
                        condition={forecast[idx].day.condition.text}
                        astro={forecast[idx].astro}
                      />
                    </Link>
                    <MetricsRow day={forecast[idx]} />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    justifyContent: "center",
                    marginTop: 8,
                  }}
                  aria-label="Paginação de dias"
                >
                  {forecast.map((_, i) => (
                    <span
                      key={i}
                      role="img"
                      aria-label={i === idx ? "Dia selecionado" : "Dia"}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: i === idx ? "#0a66c2" : "#c7d5e0",
                      }}
                    />
                  ))}
                </div>
              </SwipeDays>
            )
          ) : (
            <div
              className="card-container"
              aria-label="Lista de cards de previsão"
            >
              {forecast.map((day) => (
                <div className="card-stack" key={day.date}>
                  <Link
                    className="card-link"
                    to={`/detalhes/${day.date}`}
                    state={{ day }}
                    style={{ textDecoration: "none", color: "inherit" }}
                    aria-label={`Abrir detalhes do dia ${new Date(
                      day.date
                    ).toLocaleDateString("pt-BR")}`}
                  >
                    <WeatherCard
                      date={day.date}
                      icon={day.day.condition.icon}
                      temp={day.day.avgtemp_c}
                      condition={day.day.condition.text}
                      astro={day.astro}
                    />
                  </Link>
                  <MetricsRow day={day} />
                </div>
              ))}
            </div>
          )}
        </PullToRefresh>
      </div>
    </main>
  );
}
