import { useNavigate } from "react-router-dom";
import emailIcon from "../assets/emailIcon.png"
import passwordIcon from "../assets/passwordIcon.png"

export default function LoginPage(){
    const navigate = useNavigate();

    return(
        <div className="login-page-div">
            <button className="back-to-map" onClick={()=>navigate("/home")}>Volver al mapa</button>
            <div className="div-register">
                <p>¡Nos alegramos de volver a verte!</p>
                <p><u>Ingresa tus datos para iniciar sesión</u>. Si no tienes una cuenta, pulsa el siguiente botón para ir a la página de <b>Registro</b> .</p>
                <button className="button-register" onClick={()=>navigate("/register")}>Registrarme</button>
            </div>
            <div className="div-login-form">
                <p>Iniciar Sesión</p>
                <form className="form-login">
                    <div className="input-wrapper">
                        <img src={emailIcon} className="form-icon" />
                        <input type="email" placeholder="Correo electrónico" />
                    </div>
                    <div className="input-wrapper">
                        <img src={passwordIcon} className="form-icon" />
                        <input type="password" placeholder="Contraseña" />
                    </div>
                    <button className="button-login-form" onClick={()=>HandleLogin}>Iniciar Sesión</button>
                </form>
            </div>
        </div>
    )
}