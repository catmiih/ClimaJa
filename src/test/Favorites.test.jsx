import {
  render,
  screen,
  within,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Favoritos from "../pages/Favoritos";

test("Favoritos: renderiza lista e permite excluir item", async () => {
  const services = {
    listFavorites: jest.fn().mockResolvedValue([
      { id: "1", name: "São Paulo", region: "SP" },
      { id: "2", name: "Praia Grande", region: "SP" },
    ]),
    removeFavorite: jest.fn().mockResolvedValue(),
  };
  window.confirm = jest.fn(() => true);

  render(
    <MemoryRouter>
      <Favoritos services={services} />
    </MemoryRouter>
  );

  // lista carregada
  expect(await screen.findByText("São Paulo")).toBeInTheDocument();

  // excluir o primeiro item
  const rows = screen.getAllByRole("listitem");
  const firstRow = rows[0];
  fireEvent.click(within(firstRow).getByRole("button", { name: /excluir/i }));

  expect(services.removeFavorite).toHaveBeenCalledWith("1");

  // item some da UI
  await waitFor(() => {
    expect(screen.queryByText("São Paulo")).not.toBeInTheDocument();
  });
});
