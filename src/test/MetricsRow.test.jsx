import { render, screen } from "@testing-library/react";
import MetricsRow from "../components/MetricsRow";

const fakeDay = {
  date: "2025-09-04",
  day: { avghumidity: 61, maxwind_kph: 18 },
  astro: { sunrise: "06:00 AM", sunset: "05:45 PM" },
};

test("variant=weather exibe vento e umidade", () => {
  render(<MetricsRow day={fakeDay} variant="weather" />);
  expect(screen.getByText(/km\/h/i)).toBeInTheDocument();
  expect(screen.getByText(/%/i)).toBeInTheDocument();
});

test("variant=sun exibe nascer e pôr do sol", () => {
  render(<MetricsRow day={fakeDay} variant="sun" />);
  expect(screen.getByText("06:00 AM")).toBeInTheDocument();
  expect(screen.getByText("05:45 PM")).toBeInTheDocument();
});
