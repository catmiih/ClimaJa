import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Detalhes from "../pages/Detalhes";

const fakeDay = {
  date: "2025-09-04",
  day: {
    avgtemp_c: 23,
    maxtemp_c: 27,
    mintemp_c: 19,
    avghumidity: 60,
    maxwind_kph: 15,
    condition: { text: "Ensolarado", icon: "//cdn" },
  },
  astro: { sunrise: "06:00 AM", sunset: "05:45 PM" },
};

test("Detalhes exibe dados do dia passado via state/forecast", () => {
  render(
    <MemoryRouter
      initialEntries={[
        { pathname: "/detalhes/2025-09-01", state: { day: fakeDay } },
      ]}
    >
      <Routes>
        <Route
          path="/detalhes/:date"
          element={<Detalhes forecast={[fakeDay]} />}
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Ensolarado/i)).toBeInTheDocument();
  expect(screen.getByText(/06:00 AM/i)).toBeInTheDocument();
  expect(screen.getByText(/05:45 PM/i)).toBeInTheDocument();
});
