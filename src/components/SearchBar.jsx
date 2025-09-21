import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Buscar cidade"
      className="search-form"
    >
      <label htmlFor="city-input" className="sr-only">
        Cidade
      </label>
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          className="search-input"
          type="text"
          placeholder="Digite o nome da cidade..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </form>
  );
}
