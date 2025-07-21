import React, { useState } from 'react';
import './SearchBar.css';
import lupa from '../assets/descarga.png';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // evita que recargue la página
    if (query.trim()) {
      console.log("Buscando:", query);
      onSearch(query); // llama a la función que viene desde Map.jsx
    }
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar"
        placeholder="Buscar calle o dirección..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">
        <img src={lupa} alt="Buscar" />
      </button>
    </form>
  );
};

export default SearchBar;
