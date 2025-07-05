import userIcon from "../assets/userIcon.png"

export default function PopUpLogin({ onLogin, onRegister }){

    return(
        <>
        <div className="popup-login">
            <figure>
                <img src={userIcon} className="userIcon"/>
                <figcaption>USUARIO</figcaption>
            </figure>
            <div>
                <p>¿Eres un nuevo usuario?</p>
                <button className="popup-button" onClick={onRegister}>Registrarse</button>
            </div>
            <div>
                <p>¿Ya tienes una cuenta?</p>
                <button className="popup-button" onClick={onLogin}>Iniciar Sesión</button>
            </div>
        </div>
        </>
    )
}