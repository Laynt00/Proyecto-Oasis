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
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import ShowComments from './ShowComments';
import './SourceInfoPanel.css';
import fuentecillaImg from '../assets/fuentecilla.png';

import RegistroPopup from './RegistroPopup';
import Header from './Header';

import proj4 from "proj4";
proj4.defs("EPSG:25830", "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs");

// ✅ COMPONENTE PARA HACER ZOOM AL MAPA
function MapFlyTo({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    if (lat && lon) {
      map.flyTo([parseFloat(lat), parseFloat(lon)], 18);
    }
  }, [lat, lon, map]);

  return null;
}

function Home() {
  const [fuentes, setFuentes] = useState([]);
  const [dogParks, setDogParks] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [geoJsonDogParks, setGeoJsonDogParks] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegistroPopup, setShowRegistroPopup] = useState(false);

  const mapRef = useRef(null);

  // ✅ NUEVOS STATES PARA COORDENADAS A LAS QUE ZOOMEAR
  const [flyToLat, setFlyToLat] = useState(null);
  const [flyToLon, setFlyToLon] = useState(null);

  const handleBuscarDireccion = async (direccion) => {
    try {
      console.log("Buscando:", direccion);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`
      );

      const data = await response.json();
      console.log("Respuesta de Nominatim:", data);

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setFlyToLat(lat); // 🔥 activa el flyTo
        setFlyToLon(lon);
      } else {
        alert("Dirección no encontrada.");
      }
    } catch (error) {
      console.error("Error buscando dirección:", error);
      alert("Error durante la búsqueda.");
    }
  };

  const handleSubmitRegistro = async (nuevoRegistro) => {
    console.log("Nuevo registro:", nuevoRegistro);

    const formData = new FormData();
    formData.append("nombre", nuevoRegistro.nombre);
    formData.append("estado", nuevoRegistro.estado);
    formData.append("imagen", nuevoRegistro.imagen);

    try {
      const response = await fetch("http://localhost:8080/api/crear-registro", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al crear el registro");
      }

      alert("Registro creado exitosamente");
    } catch (error) {
      alert("Error al enviar el registro: " + error.message);
    }

    setShowRegistroPopup(false);
  };

  useEffect(() => {
    fetchFontData();
    fetchDogParkData();
  }, []);

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

  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const DogParkIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
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
      <Header onCrearRegistro={() => setShowRegistroPopup(true)} />

      <div className="top-bar">
        <div className="filter-wrapper">
          <FilterDropdown onFilterChange={handleFilterChange} />
        </div>
        <div className="search-wrapper">
          <SearchBar onSearch={handleBuscarDireccion} />
        </div>
      </div>

      {showLoginPopup && (
        <PopUpLogin 
          onClose={() => setShowLoginPopup(false)} 
          onCrearRegistro={() => setShowRegistroPopup(true)}
        />
      )}

      <div className="map-container" style={{ position: 'relative' }}>
        {selectedSource && (
          <div className="overlay" onClick={() => setSelectedSource(null)}></div>
        )}

        <MapContainer
          center={initialPosition}
          zoom={16}
          scrollWheelZoom={true}
          zoomControl={false}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* 🔥 Este es el componente que hace el zoom dinámico */}
          {flyToLat && flyToLon && <MapFlyTo lat={flyToLat} lon={flyToLon} />}

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
      </div>

      {showRegistroPopup && (
        <RegistroPopup
          isOpen={showRegistroPopup}
          onClose={() => setShowRegistroPopup(false)}
          onSubmit={handleSubmitRegistro}
        />
      )}
    </div>
  );
}

export default Home;
