import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";

const fakeForecast = {
  location: { name: "São Paulo", region: "SP" },
  forecast: [
    {
      date: "2025-09-04",
      day: { avgtemp_c: 25, condition: { text: "Sol", icon: "//cdn" } },
      astro: { sunrise: "06:00 AM", sunset: "06:00 PM" },
    },
  ],
};

const mockFetchForecast = jest.fn(async () => fakeForecast);

beforeEach(() => {
  jest.clearAllMocks();
});

test("Home: chama geolocalização automática ao montar", async () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn((success) =>
      success({ coords: { latitude: -23.5, longitude: -46.6 } })
    ),
  };
  global.navigator.geolocation = mockGeolocation;

  render(
    <MemoryRouter>
      <Home fetchForecast={mockFetchForecast} />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(mockFetchForecast).toHaveBeenCalledTimes(1);
  });

  expect(screen.getByText(/Clima em São Paulo/i)).toBeInTheDocument();
});

test("Home: se geolocalização falha, mostra fallback de pesquisa", async () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn((_, error) =>
      error(new Error("Permissão negada"))
    ),
  };
  global.navigator.geolocation = mockGeolocation;
  localStorage.clear();

  render(
    <MemoryRouter>
      <Home fetchForecast={mockFetchForecast} />
    </MemoryRouter>
  );

  expect(await screen.findByText(/Pesquise uma cidade/i)).toBeInTheDocument();
});
