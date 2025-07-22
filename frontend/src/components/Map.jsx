import { useState, useEffect, useRef } from "react";
import "../App.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  GeoJSON,
  useMap,
  Polyline
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
import ResourcePopup from './ResourcePopup';

import RegistroPopup from './RegistroPopup';
import Header from './Header';
import ubiUsuarioImg from '../assets/icono-miUbicacion.png'
import ubiFuenteImg from '../assets/icono-fuente.png'
import ubiPerroImg from '../assets/icono-parqueCanino.png'
import ubiBancoImg from '../assets/icono-banco.png'

import proj4 from "proj4";
proj4.defs("EPSG:25830", "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs");

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
  const [resources, setResources] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedSource, setSelectedSource] = useState(null);
  const [routeTarget, setRouteTarget] = useState(null); // Nuevo estado para el objetivo de ruta
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegistroPopup, setShowRegistroPopup] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [routeGeoJson, setRouteGeoJson] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);
  


  // ✅ NUEVOS STATES PARA COORDENADAS A LAS QUE ZOOMEAR
  const [flyToLat, setFlyToLat] = useState(null);
  const [flyToLon, setFlyToLon] = useState(null);
 
  const handleBuscarDireccion = async (direccion) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setFlyToLat(lat);
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
    const formData = new FormData();
    formData.append("nombre", nuevoRegistro.nombre);
    formData.append("estado", nuevoRegistro.estado);
    formData.append("imagen", nuevoRegistro.imagen);

    try {
      const response = await fetch("http://localhost:8080/api/crear-registro", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Error al crear el registro");
      alert("Registro creado exitosamente");
    } catch (error) {
      alert("Error al enviar el registro: " + error.message);
    }
    setShowRegistroPopup(false);
  };

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
            tipo: item.type ? item.type.toLowerCase() : 'desconocido',
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

  // Efecto para calcular rutas - ahora depende de routeTarget
  useEffect(() => {
    if (!routeTarget || !userPosition) return;

    const fetchRoute = async () => {
      const from = `${userPosition.lng},${userPosition.lat}`;
      const to = `${routeTarget.geometry.coordinates[0]},${routeTarget.geometry.coordinates[1]}`;
      try {
        const res = await fetch(`https://router.project-osrm.org/route/v1/foot/${from};${to}?overview=full&geometries=geojson`);
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
          setRouteGeoJson({
            type: "Feature",
            geometry: data.routes[0].geometry,
            properties: {}
          });
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [routeTarget, userPosition]);

  // Configuración de iconos
  const UserIcon = L.icon({
    iconUrl: ubiUsuarioImg,
    shadowUrl: iconShadow,
    iconSize: [38, 62],
    iconAnchor: [18, 61],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  L.Marker.prototype.options.icon = UserIcon;

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
    iconUrl: ubiBancoImg,
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

      let tipoTexto = '';
      let colorBoton = '#4CAF50';
      let colorRuta = '#06a4e2ff';

      if (tipo === 'dogpark') {
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
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <button class="more-info-btn" style="
            padding: 4px 8px;
            background-color: ${colorBoton};
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            flex-shrink: 0;
          ">+info</button>
          <button class="route-btn" style="
            padding: 4px 8px;
            background-color: ${colorRuta};
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            flex-shrink: 0;
          ">Ruta</button>
        </div>
      `;

      // Manejador para el botón +info
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

      // Manejador para el botón Ruta - ¡ESTA ES LA PARTE CLAVE!
      popupDiv.querySelector(".route-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        setRouteTarget(feature); // Establecer este recurso como objetivo de ruta
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
  
 function LocationMarker({ setUserLocation, setUserPosition, userPosition }) {
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setUserPosition(e.latlng);
      setUserLocation(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const UserIcon = L.icon({
    iconUrl: ubiUsuarioImg,
    shadowUrl: iconShadow,
    iconSize: [38, 62],
    iconAnchor: [18, 61],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return userPosition === null ? null : (
    <Marker position={userPosition} icon={UserIcon}>
      <Popup>Estás aquí</Popup>
    </Marker>
  );
}



const initialPosition = [36.72, -4.42];

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  console.log("Filtros activos en render:", activeFilters);

  if (geoJsonData) {
  const tiposUnicos = new Set(geoJsonData.features.map(f => f.properties.tipo));
  console.log("Tipos detectados en features:", Array.from(tiposUnicos));
}

const filteredGeoJson = geoJsonData && {
  ...geoJsonData,
  features: geoJsonData.features.filter(feature =>
    activeFilters.length === 0 || activeFilters.includes(feature.properties.tipo)
  )
};

console.log("Filtros activos en render:", activeFilters);


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
        {(selectedSource || routeGeoJson) && (
          <div className="overlay" onClick={() => {
            setSelectedSource(null);
            setRouteTarget(null); // Limpiar objetivo de ruta
            setRouteGeoJson(null); // Limpiar ruta mostrada
          }}></div>
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

          {flyToLat && flyToLon && <MapFlyTo lat={flyToLat} lon={flyToLon} />}

          <Marker position={initialPosition}>
            <Popup>Estás aquí</Popup>
          </Marker>
          <LocationMarker
            setUserLocation={setUserLocation}
            setUserPosition={setUserPosition}
            userPosition={userPosition}
          />

          
          {filteredGeoJson && (
            <GeoJSON
              key={JSON.stringify(activeFilters)}
              data={filteredGeoJson}
              onEachFeature={onEachFeature}
              pointToLayer={pointToLayer}
            />
          )}
          
          {routeGeoJson && (
            <GeoJSON 
              data={routeGeoJson} 
              style={{ color: 'blue', weight: 4 }} 
            />
          )}
          
          {routeCoordinates && (
            <Polyline
              positions={routeCoordinates}
              pathOptions={{ color: 'blue', weight: 4, dashArray: '5,10' }}
            />
          )}
        </MapContainer>

        {selectedSource && (
          <ResourcePopup
            selectedSource={selectedSource}
            onClose={() => setSelectedSource(null)}
          />
        )}
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