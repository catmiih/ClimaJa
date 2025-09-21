// src/__tests__/Home.test.jsx
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";

const fakeFetch = async (city) => ({
  location: { name: city, region: "SP", localtime: "2025-09-04 21:00" },
  forecast: [
    {
      date: "2025-09-04",
      day: {
        avgtemp_c: 23,
        avghumidity: 60,
        maxwind_kph: 15,
        condition: { text: "Ensolarado", icon: "//cdn" },
      },
      astro: { sunrise: "06:00 AM", sunset: "05:45 PM" },
    },
    {
      date: "2025-09-05",
      day: {
        avgtemp_c: 22,
        avghumidity: 62,
        maxwind_kph: 12,
        condition: { text: "Parcial nublado", icon: "//cdn" },
      },
      astro: { sunrise: "06:01 AM", sunset: "05:44 PM" },
    },
    {
      date: "2025-09-06",
      day: {
        avgtemp_c: 21,
        avghumidity: 65,
        maxwind_kph: 10,
        condition: { text: "Nublado", icon: "//cdn" },
      },
      astro: { sunrise: "06:02 AM", sunset: "05:43 PM" },
    },
  ],
});

test("Home: digitar cidade (>=3) renderiza cards", async () => {
  render(
    <MemoryRouter>
      <Home fetchForecast={fakeFetch} />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText(/cidade/i);
  fireEvent.change(input, { target: { value: "Praia" } });

  const links = await screen.findAllByRole("link");
  const cardLinks = links.filter((a) =>
    (a.getAttribute("href") || "").startsWith("/detalhes/")
  );

  expect(cardLinks.length).toBe(3);
  expect(within(cardLinks[0]).getByText(/23/i)).toBeTruthy();
});
