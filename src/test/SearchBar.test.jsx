import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

test("chama onSearch ao digitar", () => {
  const onSearch = jest.fn();
  render(<SearchBar onSearch={onSearch} />);
  const input = screen.getByPlaceholderText(/cidade/i);
  fireEvent.change(input, { target: { value: "Sao Paulo" } });
  expect(onSearch).toHaveBeenCalledWith("Sao Paulo");
});
