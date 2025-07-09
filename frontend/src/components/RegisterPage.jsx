import { useNavigate } from "react-router-dom";
import { useState } from "react";
import nameIcon from "../assets/nameIcon.png"
import emailIcon from "../assets/emailIcon.png"
import passwordIcon from "../assets/passwordIcon.png"
import closeButton from "../assets/closeButton.png"
import closeButtonHover from "../assets/closeButtonHover.png"

export default function RegisterPage(){
    const navigate = useNavigate();
    const [isHover, setHover] = useState(false);

    return(
        <div className="register-page-div">
            <button className="close-button" onClick={() => navigate("/home")} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <img src={isHover ? closeButtonHover : closeButton} className="close-button-image"/>
            </button>
            <div className="div-register-form">
                <p>Registrarse</p>
                <form className="form-register">
                    <div className="input-wrapper">
                        <img src={nameIcon} className="form-icon" />
                        <input type="text" placeholder="Nombre" />
                    </div>
                    <div className="input-wrapper">
                        <img src={emailIcon} className="form-icon" />
                        <input type="email" placeholder="Correo electrónico" />
                    </div>
                    <div className="input-wrapper">
                        <img src={passwordIcon} className="form-icon" />
                        <input type="password" placeholder="Contraseña" />
                    </div>
                    <div className="input-wrapper">
                        <img src={passwordIcon} className="form-icon" />
                        <input type="password" placeholder="Repetir contraseña" />
                    </div>
                    <button className="button-register-form">Registrarse</button>
                </form>
            </div>
            <div className="div-login">
                <p>¡Bienvenido, nuevo usuario!</p>
                <p><u>Ingresa tus datos para crear una cuenta nueva</u>. Si ya tienes una cuenta, pulsa el siguiente botón para ir a la página de <b>Inicio de Sesión</b> .</p>
                <button className="button-login" onClick={() => navigate("/login")}>Iniciar Sesión</button>
            </div>
        </div>
    )
}