export default function RegisterPage() {
  return (
    <div style={{ padding: "2em", background: "white", zIndex: 9999, position: "relative" }}>
      <button className="close-button">X</button>
      <h2>Registro de Usuario</h2>
      <form className="form-login">
        <label htmlFor="">Correo electrónico: </label>
        <br />
        <input type="email" />
        <br />
        <label htmlFor="">Contraseña: </label>
        <br />
        <input type="password" />
      </form>
    </div>
  );
}
