import { useState } from "react";
import "../App.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
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

function Home(){

    // Estado para mostrar/ocultar el popup
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    // const [view, setView] = useState("popup");

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
                </MapContainer>
            </div>
        </div>
    )
}

export default Home;