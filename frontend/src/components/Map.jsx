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
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import PopUpLogin from './PopUpLogin';
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage';
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import userIcon from '../assets/userIcon.png';
// import WelcomePage from './WelcomePage';
import ShowComments from './ShowComments';
import './SourceInfoPanel.css';
import fuentecillaImg from '../assets/fuentecilla.png';


import proj4 from "proj4";

proj4.defs("EPSG:25830", "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs");

function Home() {
  const [fuentes, setFuentes] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const fetchFontData = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/fuente");
    const data = await response.json(); // No es un GeoJSON estándar
    console.log("Data fetched successfully:", data);

    // Procesamiento para setFuentes (si necesitas los datos originales)
    setFuentes(data);

    // Convertir datos al formato esperado por tu componente
    const datosProcesados = data.map(item => ({
      nombre: item.nombre,
      coordenadas: [item.x, item.y]
    }));

    // Transformación de coordenadas EPSG:25830 a WGS84 (lon, lat)
    const convertedFeatures = data.map((item) => {
      const [lon, lat] = proj4("EPSG:25830", "WGS84", [item.x, item.y]);
      return {
        type: "Feature", // Necesario para GeoJSON
        properties: {
          nombre: item.nombre,
          id: item.id
        },
        geometry: {
          type: "Point",
          coordinates: [lon, lat]
        }
      };
    });

    // Crear un GeoJSON válido con las features convertidas
    setGeoJsonData({
      type: "FeatureCollection",
      features: convertedFeatures
    });

  } catch (error) {
    console.error("Error:", error);
  }
};

  useEffect(() => {
    fetchFontData();
  }, []);

  // Configuración de iconos de Leaflet
  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.nombre) {
      const popupDiv = document.createElement("div");
      popupDiv.innerHTML = `
        <strong>${feature.properties.nombre}</strong><br/>
        <button class="more-info-btn" style="
          margin-top: 8px;
          padding: 4px 8px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        ">+info</button>
      `;
      popupDiv.querySelector(".more-info-btn").addEventListener("click", () => {
        console.log("Más información sobre:", feature.properties);
        // Hacer una llamada a la API para obtener los comentarios específicos de esta fuente
        setSelectedSource(feature);
      });

      layer.bindPopup(popupDiv);
    }
  };

  const pointToLayer = (feature, latlng) => {
    return L.marker(latlng, {
      icon: DefaultIcon
    });
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

      <div className="map-container">
        <MapContainer center={initialPosition} zoom={16} scrollWheelZoom={true} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Icono Zoom + / - */}
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

        {/* PANEL DERECHO DE INFORMACIÓN */}
        {selectedSource && (
        <div className="source-panel">
          <button className="close-btn" onClick={() => setSelectedSource(null)}>✕</button>

          <div className="panel-header">
            <div className="panel-text">
              <h2>{selectedSource.properties.nombre}</h2>
              <p><strong>Calle:</strong> {selectedSource.properties.calle || "Nombredecalle"}</p>
              <p><strong>Estado:</strong> <span className="estado-ok">OK</span></p>
              <p><small>Última actualización de estado</small></p>
              <p><strong>10/10/2025</strong></p>
            </div>
            <img src={fuentecillaImg} alt="Fuente" className="panel-img" />


          </div>
              <ShowComments></ShowComments>
        </div>
      )}

      </div>
    </div>
  );
}

export default Home;
