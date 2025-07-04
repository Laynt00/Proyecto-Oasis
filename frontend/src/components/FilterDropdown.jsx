import React, { useState } from 'react';
import './FilterDropdown.css';

const FilterDropdown = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleFilter = (filter) => {
    let updatedFilters;
    if (activeFilters.includes(filter)) {
      updatedFilters = activeFilters.filter((f) => f !== filter);
    } else {
      updatedFilters = [...activeFilters, filter];
    }
    setActiveFilters(updatedFilters);
    onFilterChange(updatedFilters); // Comunica al padre (App)
  };

  const options = ['Fuentes', 'Bancos', 'Parques'];

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        Filtros <span style={{ fontWeight: 'normal' }}>▾</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option}
              className={`dropdown-item ${activeFilters.includes(option) ? 'active' : ''}`}
              onClick={() => toggleFilter(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
