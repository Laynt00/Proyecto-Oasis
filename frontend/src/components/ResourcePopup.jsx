import React from "react";
import ShowComments from './ShowComments';
import './SourceInfoPanel.css';

const ResourcePopup = ({ selectedSource, onClose }) => {
  if (!selectedSource) return null;

  // Asegúrate de que estos valores están disponibles
  const resourceId = selectedSource.id || selectedSource.properties?.id;
  const resourceType = selectedSource.type?.toLowerCase() || 
                      selectedSource.properties?.tipo?.toLowerCase();

  return (
    <div className="source-panel">
      {/* ... resto del código ... */}
      <ShowComments
        resourceId={resourceId}
        resourceType={resourceType}
      />
    </div>
  );
};

export default ResourcePopup;