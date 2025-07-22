import React, { useState } from 'react';
import './FilterDropdown.css';

const FilterDropdown = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const options = [
    { label: 'Fuentes', value: 'font' },
    { label: 'Bancos', value: 'bench' },
    { label: 'Parques', value: 'dog_park' }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleFilter = (value) => {
    const updatedFilters = activeFilters.includes(value)
      ? activeFilters.filter((f) => f !== value)
      : [...activeFilters, value];

    setActiveFilters(updatedFilters);
    onFilterChange(updatedFilters); // ✔️ Aquí se mandan los valores correctos
  };

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
