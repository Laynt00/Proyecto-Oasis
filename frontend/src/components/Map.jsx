import { useState, useEffect } from "react";
import "../App.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  GeoJSON
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import PopUpLogin from './PopUpLogin';
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import ShowComments from './ShowComments';
import './SourceInfoPanel.css';
import fuentecillaImg from '../assets/fuentecilla.png';
import ubiUsuarioImg from '../assets/icono-miUbicacion.png'
import ubiFuenteImg from '../assets/icono-fuente.png'
import ubiPerroImg from '../assets/icono-parqueCanino.png'

import proj4 from "proj4";

proj4.defs("EPSG:25830", "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs");

function Home() {
  const [resources, setResources] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const fetchResources = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/resources");
      const data = await response.json();

      const convertedFeatures = data.map((item) => {
        const [lon, lat] = proj4("EPSG:25830", "WGS84", [item.coord_x, item.coord_y]);
        return {
          type: "Feature",
          properties: {
            nombre: item.name,
            id: item.id,
            tipo: item.type.toLowerCase(), // Convertimos a minúsculas para consistencia
            status: item.status || 'OK',
            photo: item.photo || '',
            comment_id: item.comment_id
          },
          geometry: {
            type: "Point",
            coordinates: [lon, lat]
          }
        };
      });

      setGeoJsonData({
        type: "FeatureCollection",
        features: convertedFeatures
      });

    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Configuración de iconos de Leaflet
  const DefaultIcon = L.icon({
    iconUrl: ubiUsuarioImg,
    shadowUrl: iconShadow,
    iconSize: [38, 62],
    iconAnchor: [18, 61],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const FontIcon = L.icon({
    iconUrl: ubiFuenteImg,
    shadowUrl: iconShadow,
    iconSize: [38, 62],
    iconAnchor: [18, 61],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const DogParkIcon = L.icon({
    iconUrl: ubiPerroImg,
    iconSize: [38, 62],
    iconAnchor: [30, 60],
    popupAnchor: [1, -30],
    shadowUrl: iconShadow,
    shadowSize: [41, 41]
  });

  const BenchIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/809/809052.png',
    iconSize: [38, 62],
    iconAnchor: [18, 61],
    popupAnchor: [1, -34],
    shadowUrl: iconShadow,
    shadowSize: [41, 41]
  });

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.nombre) {
      const popupDiv = document.createElement("div");
      const tipo = feature.properties.tipo;
      const nombre = feature.properties.nombre;

      let tipoTexto = '';
      let colorBoton = '#4CAF50'; // Color por defecto (verde)

      if (tipo === 'dog_park') {
        tipoTexto = '<em>Parque para perros</em><br/>';
        colorBoton = '#FFA500';
      } else if (tipo === 'bench') {
        tipoTexto = '<em>Banco público</em><br/>';
        colorBoton = '#9C27B0';
      } else if (tipo === 'font') {
        tipoTexto = '<em>Fuente pública</em><br/>';
      }

      popupDiv.innerHTML = `
        <strong>${feature.properties.nombre}</strong><br/>
        ${tipoTexto}
        <button class="more-info-btn" style="
          margin-top: 8px;
          padding: 4px 8px;
          background-color: ${colorBoton};
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        ">+info</button>
      `;

      popupDiv.querySelector(".more-info-btn").addEventListener("click", async (e) => {
        e.stopPropagation();
        try {
          const response = await fetch(`http://localhost:8080/api/resources/${feature.properties.id}`);
          const resourceData = await response.json();

          setSelectedSource({
            ...resourceData,
            geometry: feature.geometry,
            properties: {
              ...feature.properties,
              ...resourceData
            }
          });
        } catch (error) {
          console.error("Error fetching resource details:", error);
        }
      });

      layer.bindPopup(popupDiv);
    }
  };

	const pointToLayer = (feature, latlng) => {
		if (feature.properties.tipo === 'dog_park') {
			return L.marker(latlng, { icon: DogParkIcon });
		} else if (feature.properties.tipo === 'bench') {
			return L.marker(latlng, { icon: BenchIcon });
		} else {
			return L.marker(latlng, { icon: FontIcon });
		}
	};

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  const initialPosition = [36.72, -4.42];

  const handleFilterChange = (filters) => {
    console.log("Filtros seleccionados:", filters);
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

      {showLoginPopup && (
        <PopUpLogin onClose={() => setShowLoginPopup(false)} />
      )}

      <div className="map-container" style={{ position: 'relative' }}>
        {selectedSource && (
          <div className="overlay" onClick={() => setSelectedSource(null)}></div>
        )}

        <MapContainer center={initialPosition} zoom={16} scrollWheelZoom={true} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <div className="leaflet-bottom leaflet-left">
            <div className="leaflet-control leaflet-bar leaflet-control-zoom">
              <a className="leaflet-control-zoom-in" href="#" title="Zoom in">+</a>
              <a className="leaflet-control-zoom-out" href="#" title="Zoom out">−</a>
            </div>
          </div>
          <Marker position={initialPosition}>
            <Popup>Estás aquí</Popup>
          </Marker>
          <LocationMarker />
          {geoJsonData && (
            <GeoJSON
              data={geoJsonData}
              onEachFeature={onEachFeature}
              pointToLayer={pointToLayer}
            />
          )}
        </MapContainer>

        {selectedSource && (
          <div className="source-panel">
            <button className="close-btn" onClick={() => setSelectedSource(null)}>✕</button>
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
        )}
      </div>
    </div>
  );
}

export default Home;