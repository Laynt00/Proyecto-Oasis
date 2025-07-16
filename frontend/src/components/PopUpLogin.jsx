import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";

import userIcon from "../assets/userIcon.png";

export default function PopUpLogin({ onClose }) {
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const { iniciada, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div ref={popupRef} className="popup-login">
      <figure className="user-appearance">
        <img src={userIcon} className="userIcon" />
        <figcaption>
          {iniciada ? "USUARIO REGISTRADO" : "USUARIO NO REGISTRADO"}
        </figcaption>
      </figure>

      {iniciada ? (
        <>
          <div>
            <p>¿Quieres registrar un lugar?</p>
            <button
              className="popup-button popup-button-blue"
              onClick={() => alert("Aquí irá tu lógica de crear lugar")}
            >
              Crear registro
            </button>
          </div>
          <div>
            <button
              className="popup-button popup-button-red"
              onClick={logout}
            >
              Cerrar sesión
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <p>¿Eres un nuevo usuario?</p>
            <button className="popup-button" onClick={() => navigate("/register")}>
              Registrarse
            </button>
          </div>
          <div>
            <p>¿Ya tienes una cuenta?</p>
            <button className="popup-button" onClick={() => navigate("/login")}>
              Iniciar Sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
}
