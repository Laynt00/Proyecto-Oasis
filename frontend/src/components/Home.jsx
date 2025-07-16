import { useState, useEffect, useRef } from "react";
import "../App.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  GeoJSON,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import PopUpLogin from './PopUpLogin';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import userIcon from '../assets/userIcon.png';
import WelcomePage from './WelcomePage';
import './SourceInfoPanel.css';
import fuentecillaImg from '../assets/fuentecilla.png';

import proj4 from "proj4";

proj4.defs("EPSG:25830", "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs");

function RoutingControl({ from, to }) {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!from || !to) return;

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(from.lat, from.lng),
        L.latLng(to[1], to[0]) // to = [lng, lat]
      ],
      lineOptions: {
        styles: [{ color: "red", weight: 3 }]
      },
      createMarker: () => null,
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false
    }).addTo(map);

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
    };
  }, [from, to, map]);

  return null;
}

function Home() {
  const [fuentes, setFuentes] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [userPosition, setUserPosition] = useState(null); // <-- estado para posición usuario

  const fetchData = async () => {
    try {
      const response = await fetch("/apidata/dataFuentes.geojson");
      const geojson = await response.json();

      const datosProcesados = geojson.features.map(feature => ({
        nombre: feature.properties.nombre,
        coordenadas: feature.geometry.coordinates
      }));
      setFuentes(datosProcesados);

      const convertedFeatures = geojson.features.map((feature) => {
        const [x, y] = feature.geometry.coordinates;
        const [lon, lat] = proj4("EPSG:25830", "WGS84", [x, y]);
        return {
          ...feature,
          geometry: {
            ...feature.geometry,
            coordinates: [lon, lat]
          }
        };
      });

      setGeoJsonData({
        ...geojson,
        features: convertedFeatures
      });

    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
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

  // Actualizamos LocationMarker para guardar la posición en estado y no solo internamente
  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setUserPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return userPosition === null ? null : (
      <Marker position={userPosition}>
        <Popup>Estás aquí</Popup>
      </Marker>
    );
  }

  const initialPosition = [36.72, -4.42];

  const handleFilterChange = (filters) => {
    console.log("Filtros seleccionados:", filters);
  };

  // Sacamos las coordenadas para RoutingControl, si hay fuente seleccionada y posición usuario
  const routeFrom = userPosition;
  const routeTo = selectedSource ? selectedSource.geometry.coordinates : null;

  return (
    <div className="App">
      <div className="top-bar">
        <div className="filter-wrapper">
          <FilterDropdown onFilterChange={handleFilterChange} />
        </div>
        <div className="search-wrapper">
          <SearchBar />
        </div>
        <div className="user-wrapper">
          <img
            src={userIcon}
            className="user-icon"
            alt="Usuario"
            onClick={() => setShowLoginPopup(!showLoginPopup)}
          />
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

          {/* Aquí incluimos RoutingControl solo si tenemos ambos puntos */}
          {routeFrom && routeTo && (
            <RoutingControl from={routeFrom} to={routeTo} />
          )}
        </MapContainer>

        {selectedSource && <div className="overlay"></div>}

        {selectedSource && (
          <div className="source-panel">
            {/* ... contenido del panel ... */}
          </div>
        )}

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

            <div className="comentarios">
              <h3>Comentarios</h3>
              <input type="text" placeholder="Deja tu comentario..." />
              <button>Enviar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
