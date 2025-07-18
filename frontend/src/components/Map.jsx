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
  const [fuentes, setFuentes] = useState([]);
  const [dogParks, setDogParks] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [geoJsonDogParks, setGeoJsonDogParks] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const fetchFontData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/fonts");
      const data = await response.json();
      setFuentes(data);

      const convertedFeatures = data.map((item) => {
        const [lon, lat] = proj4("EPSG:25830", "WGS84", [item.coord_x, item.coord_y]);
        return {
          type: "Feature",
          properties: {
            nombre: item.nombre,
            id: item.id,
            tipo: 'fuente'
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
      console.error("Error fetching fonts:", error);
    }
  };

  const fetchDogParkData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/dogparks");
      const data = await response.json();
      setDogParks(data);

      const convertedFeatures = data.map((item) => {
        const [lon, lat] = proj4("EPSG:25830", "WGS84", [item.coord_x, item.coord_y]);
        return {
          type: "Feature",
          properties: {
            nombre: item.nombre || "Parque de perros",
            id: item.id,
            tipo: 'dogpark'
          },
          geometry: {
            type: "Point",
            coordinates: [lon, lat]
          }
        };
      });

      setGeoJsonDogParks({
        type: "FeatureCollection",
        features: convertedFeatures
      });

    } catch (error) {
      console.error("Error fetching dog parks:", error);
    }
  };

  useEffect(() => {
    fetchFontData();
    fetchDogParkData();
  }, []);

  // Configuración de iconos de Leaflet
  const DefaultIcon = L.icon({
    iconUrl: ubiFuenteImg,
    shadowUrl: iconShadow,
    iconSize: [38, 62],
    iconAnchor: [18, 61],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const DogParkIcon = L.icon({
    iconUrl: ubiPerroImg,
    iconSize: [38, 62],
    iconAnchor: [30, 60],
    popupAnchor: [1, -30],
    shadowUrl: iconShadow,
    shadowSize: [41, 41]
  });

  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.nombre) {
      const popupDiv = document.createElement("div");
      const isDogPark = feature.properties.tipo === 'dogpark';
      
      popupDiv.innerHTML = `
        <strong>${feature.properties.nombre}</strong><br/>
        ${isDogPark ? '<em>Parque para perros</em><br/>' : ''}
        <button class="more-info-btn" style="
          margin-top: 8px;
          padding: 4px 8px;
          background-color: ${isDogPark ? '#FFA500' : '#4CAF50'};
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        ">+info</button>
      `;
      
      popupDiv.querySelector(".more-info-btn").addEventListener("click", () => {
        setSelectedSource(feature);
      });

      layer.bindPopup(popupDiv);
    }
  };

  const pointToLayer = (feature, latlng) => {
    return feature.properties.tipo === 'dogpark' 
      ? L.marker(latlng, { icon: DogParkIcon })
      : L.marker(latlng, { icon: DefaultIcon });
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
        {/* Overlay oscuro */}
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
          {geoJsonDogParks && (
            <GeoJSON
              data={geoJsonDogParks}
              onEachFeature={onEachFeature}
              pointToLayer={pointToLayer}
            />
          )}
        </MapContainer>

        {/* Panel lateral derecho */}
        {selectedSource && (
          <div className="source-panel">
            <button className="close-btn" onClick={() => setSelectedSource(null)}>✕</button>
            <div className="panel-header">
              <div className="panel-text">
                <h2>{selectedSource.properties.nombre}</h2>
                {selectedSource.properties.tipo === 'dogpark' ? (
                  <>
                    <p><strong>Parque para perros</strong></p>
                    <p><strong>Estado:</strong> <span className="estado-ok">Abierto</span></p>
                  </>
                ) : (
                  <>
                    <p><strong>Calle:</strong> {selectedSource.properties.calle || "Nombre de calle"}</p>
                    <p><strong>Estado:</strong> <span className="estado-ok">OK</span></p>
                  </>
                )}
                <p><small>Última actualización de estado</small></p>
                <p><strong>10/10/2025</strong></p>
              </div>
              <img
                src={selectedSource.properties.tipo === 'dogpark'
                  ? ubiPerroImg
                  : fuentecillaImg}
                alt={selectedSource.properties.tipo === 'dogpark' ? "Parque de perros" : "Fuente"}
                className="panel-img"
              />
            </div>
            <ShowComments />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
