import "./WeatherCard.css";
import { FaSun, FaMoon } from "react-icons/fa";

export default function WeatherCard({ date, icon, temp, condition, astro }) {
  const dia = new Date(date).getDate().toString().padStart(2, "0");
  const mes = new Date(date).toLocaleDateString("pt-BR", { month: "short" });
  const weekday = new Date(date).toLocaleDateString("pt-BR", {
    weekday: "short",
  });

  return (
    <div
      className="weather-card"
      role="group"
      aria-label={`Previsão para ${dia} de ${mes}`}
    >
      <div className="left">
        <p className="weekday">
          {weekday}
          <br />
          <span className="weather-date">
            {dia} de {mes}
          </span>
        </p>
      </div>

      <div className="center">
        <img
          src={icon}
          alt={`Condição: ${condition || "clima"}`}
          decoding="async"
        />
        <p
          className="temp"
          aria-label={`Temperatura média ${Math.round(temp)} graus Celsius`}
        >
          {Math.round(temp)}°C
        </p>
      </div>

      <div className="right">
        <div className="sun-times">
          <FaSun title="Nascer do sol" color="#FFA500" /> {astro.sunrise}
        </div>
        <div className="sun-times">
          <FaMoon title="Pôr do sol" color="#5555ff" /> {astro.sunset}
        </div>
      </div>
    </div>
  );
}
