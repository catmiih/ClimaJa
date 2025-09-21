import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

test("Dashboard: mostra total e média (amostra)", async () => {
  const services = {
    listFavorites: jest.fn().mockResolvedValue([
      { id: "1", name: "São Paulo" },
      { id: "2", name: "Praia Grande" },
    ]),
    getForecast: jest.fn(async (city) => ({
      forecast: [{ day: { avgtemp_c: city === "São Paulo" ? 24 : 26 } }],
    })),
  };

  render(
    <MemoryRouter>
      <Dashboard services={services} />
    </MemoryRouter>
  );

  // loading
  expect(screen.getByRole("status")).toHaveTextContent(/calculando/i);

  await waitFor(() => {
    expect(screen.getByText("2")).toBeInTheDocument(); // total
    expect(screen.getByText("25°C")).toBeInTheDocument(); // média
  });
});

test("Dashboard: erro é anunciado como alert", async () => {
  const services = {
    listFavorites: jest.fn().mockRejectedValue(new Error("fail")),
    getForecast: jest.fn(),
  };

  render(
    <MemoryRouter>
      <Dashboard services={services} />
    </MemoryRouter>
  );

  expect(await screen.findByRole("alert")).toHaveTextContent(
    /não foi possível/i
  );
});
