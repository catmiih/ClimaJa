import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getForecast } from "../services/weatherService";
import {
  FaSun,
  FaMoon,
  FaArrowLeft,
  FaTint,
  FaWind,
  FaThermometerHalf,
} from "react-icons/fa";
import MetricsRow from "../components/MetricsRow";
import "./Detalhes.css";

export default function Detalhes({ forecast = [] }) {
  const { date } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const passedDay = location.state?.day;
  const fromProps = useMemo(
    () => forecast.find((d) => d.date === date),
    [forecast, date]
  );

  const [dia, setDia] = useState(passedDay || fromProps);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dia) return;
    const lastCity = localStorage.getItem("lastCity");
    if (!lastCity) return;

    (async () => {
      setLoading(true);
      try {
        const { forecast: fc } = await getForecast(lastCity);
        setDia(fc.find((d) => d.date === date) || null);
      } finally {
        setLoading(false);
      }
    })();
  }, [dia, date]);

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  if (loading) return <p className="det-loading">Carregando...</p>;

  if (!dia) {
    return (
      <div className="det-container">
        <button className="det-back" onClick={handleBack}>
          <FaArrowLeft /> Voltar
        </button>
        <p className="det-empty">
          Não foi possível carregar os detalhes desse dia.
        </p>
      </div>
    );
  }

  const { astro, day } = dia;

  return (
    <div className="det-container">
      <button className="det-back" onClick={handleBack}>
        <FaArrowLeft /> Voltar
      </button>

      <h2 className="det-title">
        {new Date(dia.date).toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "2-digit",
          month: "long",
        })}
      </h2>

      <div className="det-hero">
        <img src={day.condition.icon} alt={day.condition.text} />
        <div>
          <div className="det-temp-main">
            <FaThermometerHalf /> {Math.round(day.avgtemp_c)}°C
          </div>
          <div className="det-temp-range">
            ⬆ {Math.round(day.maxtemp_c)}°C &nbsp; ⬇ {Math.round(day.mintemp_c)}
            °C
          </div>
          <div className="det-cond">{day.condition.text}</div>
        </div>
      </div>

      <div className="det-metrics">
        <MetricsRow day={dia} variant="weather" />
        <MetricsRow day={dia} variant="sun" />
      </div>
    </div>
  );
}
