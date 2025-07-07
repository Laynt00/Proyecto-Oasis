import { useNavigate } from "react-router-dom";
import userIcon from "../assets/userIcon.png"
import { useEffect, useRef } from "react";

export default function PopUpLogin({ onClose }){
    const popupRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event) {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            onClose(); 
        }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return(
        <>
        <div ref={popupRef} className="popup-login">
            <figure className="user-appearance">
                <img src={userIcon} className="userIcon"/>
                <figcaption>USUARIO NO REGISTRADO</figcaption>
            </figure>
            <div>
                <p>¿Eres un nuevo usuario?</p>
                <button className="popup-button" onClick={() => navigate("/register")}>Registrarse</button>
            </div>
            <div>
                <p>¿Ya tienes una cuenta?</p>
                <button className="popup-button" onClick={() => navigate("/login")}>Iniciar Sesión</button>
            </div>
        </div>
        </>
    )
}