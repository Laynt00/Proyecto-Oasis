import React, { useState, useEffect } from 'react';
import ShowComments from './ShowComments';
import './ResourceInfoPanel.css';

const ResourceInfoPanel = ({ selectedSource, onClose }) => {
  const [resourceType, setResourceType] = useState('');

  useEffect(() => {
    if (selectedSource) {
      // Determinar el tipo de recurso
      const type = selectedSource.properties?.type || selectedSource.resource_type;
      if (type === 'dog_park' || type === 'dogpark') {
        setResourceType('dog_park');
      } else if (type === 'bench') {
        setResourceType('bench');
      } else {
        setResourceType('font');
      }
    }
  }, [selectedSource]);

  if (!selectedSource) return null;
  
  return (
    <div className="source-panel">
      <button className="close-btn" onClick={onClose}>✕</button>
      <div className="panel-header">
        <div className="panel-text">
          <h2>{selectedSource.name || selectedSource.nombre || "Recurso"}</h2>

          {resourceType === 'dog_park' ? (
            <>
              <p><strong>Parque para perros</strong></p>
              {selectedSource.photo && (
                <img src={selectedSource.photo} alt="Foto del parque" className="panel-img" />
              )}
            </>
          ) : resourceType === 'bench' ? (
            <>
              <p><strong>Banco público</strong></p>
              <p><strong>Estado:</strong>
                <span className={`estado-${selectedSource.status?.toLowerCase() || 'ok'}`}>
                  {selectedSource.status || 'OK'}
                </span>
              </p>
              {selectedSource.photo && (
                <img src={selectedSource.photo} alt="Foto del banco" className="panel-img" />
              )}
            </>
          ) : (
            <>
              <p><strong>Fuente</strong></p>
              <p><strong>Estado:</strong>
                <span className={`estado-${selectedSource.status?.toLowerCase() || 'ok'}`}>
                  {selectedSource.status || 'OK'}
                </span>
              </p>
              {selectedSource.photo && (
                <img src={selectedSource.photo} alt="Foto de la fuente" className="panel-img" />
              )}
            </>
          )}

          <p><small>Coordenadas:</small></p>
          <p>
            <strong>
              {selectedSource.geometry?.coordinates?.[0]?.toFixed(6) || selectedSource.coord_x},
              {selectedSource.geometry?.coordinates?.[1]?.toFixed(6) || selectedSource.coord_y}
            </strong>
          </p>
        </div>
      </div>

      {/* Sección de comentarios */}
      <div className="comments-section">
        <ShowComments 
          resourceId={selectedSource.id} 
        />
      </div>
    </div>
  );
};

export default ResourceInfoPanel;