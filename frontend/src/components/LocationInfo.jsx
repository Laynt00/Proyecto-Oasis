import React from "react";
import "../App.css";

const LocationInfo = ({ feature, onClose }) => {
  if (!feature) return null;

  return (
    <div className="location-info">
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      <h2>{feature.properties.nombre}</h2>
      <p>
        <strong>Localización:</strong> {feature.geometry.coordinates[1].toFixed(4)}, {feature.geometry.coordinates[0].toFixed(4)}
      </p>
    </div>
  );
};

export default LocationInfo;