import "./Header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userIcon from '../assets/userIcon.png';
import PopUpLogin from './PopUpLogin';

// ✅ Recibe la prop onCrearRegistro
export default function Header({ onCrearRegistro }) {
    const navigate = useNavigate();
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    return (
        <div className="web-header">
            <div className="web-title" onClick={() => navigate("/")}>
                Oasis
            </div>
            <div className="user-wrapper">
                <img
                    src={userIcon}
                    className="user-icon"
                    alt="Usuario"
                    onClick={() => setShowLoginPopup(!showLoginPopup)}
                />
            </div>

            {/* ✅ Popup login con onCrearRegistro correctamente pasado */}
            {showLoginPopup && (
                <PopUpLogin 
                    onClose={() => setShowLoginPopup(false)} 
                    onCrearRegistro={() => {
                        setShowLoginPopup(false);
                        onCrearRegistro(); // ✅ Llamamos al handler del padre
                    }}
                />
            )}
        </div>
    );
}
