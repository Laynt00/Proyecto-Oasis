import { useState, useEffect} from "react";
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
import SearchBar from "./SearchBar";
import FilterDropdown from "./FilterDropdown";
import userIcon from '../assets/userIcon.png';

import proj4 from "proj4";

// Configuración de proj4 para conversión de coordenadas UTM a WGS84
proj4.defs(
  "EPSG:25830",
  "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs"
);

function Home(){
  const [fuentes, setFuentes] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  
  const fetchData = async () => {
    try {
      const response = await fetch("/apidata/dataFuentes.geojson");
      const geojson = await response.json();

      // Procesamiento para el estado fuentes
      const datosProcesados = geojson.features.map(feature => ({
        nombre: feature.properties.nombre,
        coordenadas: feature.geometry.coordinates
      }));
      setFuentes(datosProcesados);

      // Procesamiento para GeoJSON con conversión de coordenadas
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

  // Estado para mostrar/ocultar el popup
  const [showLoginPopup, setShowLoginPopup] = useState(false);

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

    // Función para personalizar cada feature del GeoJSON
    const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.nombre) {
        layer.bindPopup(`<b>${feature.properties.nombre}</b>`);
    }
    };

    // Función para convertir puntos a markers con icono personalizado
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

    const initialPosition = [36.72, -6.42];

    const handleFilterChange = (filters) => {
        console.log("Filtros seleccionados:", filters);
    };

    return(
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
                <PopUpLogin onClose={() => setShowLoginPopup(false)}/>
            )}

        <div className="map-container">
            <MapContainer center={initialPosition} zoom={16} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={initialPosition}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <LocationMarker />
            
            {/* GeoJSON de las fuentes de agua */}
            {geoJsonData && (
                <GeoJSON
                data={geoJsonData}
                onEachFeature={onEachFeature}
                pointToLayer={pointToLayer}
                />
            )}
            </MapContainer>
        </div>
        </div>
    )
}

export default Home;