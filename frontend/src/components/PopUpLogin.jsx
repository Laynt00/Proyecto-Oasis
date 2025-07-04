import userIcon from "../assets/userIcon.png"

export default function PopUpLogin({ onLogin, onRegister }){

    return(
        <>
        <div className="popup-login">
            <img src={userIcon} className="userIcon"/>
            <p>USUARIO</p>
            <div>
                <p>Si no tienes una cuenta, regístrate</p>
                <button onClick={onRegister}>Registrarse</button>
            </div>
            <div>
                <p>Si ya tienes una cuenta, inicia sesión</p>
                <button onClick={onLogin}>Iniciar Sesión</button>
            </div>
        </div>
        </>
    )
}