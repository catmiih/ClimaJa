import StatItem from "./StatItem";
import { FaWind, FaTint, FaSun, FaMoon } from "react-icons/fa";
import "./MetricsRow.css";

export default function MetricsRow({ day, variant = "weather" }) {
  if (!day) return null;

  if (variant === "sun") {
    return (
      <div className="metrics-row">
        <StatItem
          className="sunrise"
          icon={FaSun}
          label="Nascer"
          value={day.astro.sunrise}
        />
        <StatItem
          className="sunset"
          icon={FaMoon}
          label="Pôr do sol"
          value={day.astro.sunset}
        />
      </div>
    );
  }

  return (
    <div className="metrics-row">
      <StatItem
        className="wind"
        icon={FaWind}
        label="Vento"
        value={`${Math.round(day.day.maxwind_kph)} km/h`}
      />
      <StatItem
        className="humidity"
        icon={FaTint}
        label="Umidade"
        value={`${Math.round(day.day.avghumidity)}%`}
      />
    </div>
  );
}
