export default function LoginPage(){
    return(
        <div className="login-page-div">
            <button className="close-button">X</button>
            <div className="div-register">
                <p>¡Nos alegramos de volver a verte!</p>
                <p>Ingresa tus datos para iniciar sesión. Si no tienes una cuenta, pulsa el siguiente botón para Registrarte.</p>
                <button>Registrarme</button>
            </div>
            <div className="div-login-form">
                <p>Iniciar Sesión</p>
                <form className="form-login">
                    <label htmlFor="">Correo electrónico: </label>
                    <br />
                    <input type="email" />
                    <br />
                    <label htmlFor="">Contraseña: </label>
                    <br />
                    <input type="password" />
                    <br />
                    <button>Iniciar Sesión</button>
                </form>
            </div>
        </div>
    )
}