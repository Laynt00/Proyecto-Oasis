import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';

function App() {
  const handleFilterChange = (filters) => {
    console.log('Filtros seleccionados:', filters);
  };

  return (
    <div className="App">
      <div className="top-bar">
        <div className="filter-wrapper">
          <FilterDropdown onFilterChange={handleFilterChange} />
        </div>
        <div className="search-wrapper">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default App;
