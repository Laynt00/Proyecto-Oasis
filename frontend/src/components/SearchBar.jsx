import React, { useState } from 'react';
import './SearchBar.css';
import lupa from '../assets/descarga.png';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-button">
        <img src={lupa} alt="Buscar" />
      </button>
    </div>
  );
};

export default SearchBar;
