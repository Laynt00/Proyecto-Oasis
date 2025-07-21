import React from "react";
import ShowComments from './ShowComments';
import './SourceInfoPanel.css';

const ResourcePopup = ({ selectedSource, onClose }) => {
    if (!selectedSource) return null;

    return (
        <div className="source-panel">
            <button className="close-btn" onClick={onClose}>✕</button>
            <div className="panel-header">
                <div className="panel-text">
                    <h2>{selectedSource.name || selectedSource.nombre || "Recurso"}</h2>

                    {selectedSource.type === 'DOG_PARK' ? (
                        <>
                            <p><strong>Parque para perros</strong></p>
                            {selectedSource.photo && (
                                <img src={selectedSource.photo} alt="Foto del parque" className="panel-img" />
                            )}
                        </>
                    ) : selectedSource.type === 'BENCH' ? (
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
                            {selectedSource.geometry?.coordinates[0]?.toFixed(6) || selectedSource.coord_x},
                            {selectedSource.geometry?.coordinates[1]?.toFixed(6) || selectedSource.coord_y}
                        </strong>
                    </p>
                </div>
            </div>
            <ShowComments
                resourceId={selectedSource.id}
                resourceType={selectedSource.type.toLowerCase()}
            />
        </div>
    );
};

export default ResourcePopup;