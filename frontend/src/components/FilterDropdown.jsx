import React, { useState } from 'react';
import './FilterDropdown.css';

const FilterDropdown = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleFilter = (value) => {
    let updatedFilters;
    if (activeFilters.includes(value)) {
      updatedFilters = activeFilters.filter((f) => f !== value);
    } else {
      updatedFilters = [...activeFilters, value];
    }
    setActiveFilters(updatedFilters);
    onFilterChange(updatedFilters); // Comunica al padre (App)
  };

  const options = [
  { label: 'Fuentes', value: 'font' },
  { label: 'Bancos', value: 'bench' },
  { label: 'Parques', value: 'dog_park' }
  ];

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={toggleDropdown}>
        Filtros <span style={{ fontWeight: 'normal' }}>▾</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option.value}
              className={`dropdown-item ${activeFilters.includes(option.value) ? 'active' : ''}`}
              onClick={() => toggleFilter(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
