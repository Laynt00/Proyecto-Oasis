import userIcon from "../assets/userIcon.png"
import { useEffect, useRef } from "react";

export default function PopUpLogin({ onClose }){
    const popupRef = useRef(null);

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
                <button className="popup-button">Registrarse</button>
            </div>
            <div>
                <p>¿Ya tienes una cuenta?</p>
                <button className="popup-button">Iniciar Sesión</button>
            </div>
        </div>
        </>
    )
}