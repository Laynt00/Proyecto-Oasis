export default function LoginPage(){
    return(
        <>
        <button className="close-button">X</button>
        <p>Iniciar Sesión</p>
        <form className="form-login">
            <label htmlFor="">Correo electrónico: </label>
            <br />
            <input type="email" />
            <br />
            <label htmlFor="">Contraseña: </label>
            <br />
            <input type="password" />
        </form>
        </>
    )
}