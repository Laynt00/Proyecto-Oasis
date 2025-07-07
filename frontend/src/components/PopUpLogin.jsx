import userIcon from "../assets/userIcon.png"

export default function PopUpLogin(){

    return(
        <>
        <div className="popup-login">
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