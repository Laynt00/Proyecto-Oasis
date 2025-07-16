import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../assets/firebase";

import emailIcon from "../assets/emailIcon.png";
import passwordIcon from "../assets/passwordIcon.png";
import { useAuth } from "./AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const { login } = useAuth(); // ✅ Hook usado correctamente dentro del componente

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Inicio de sesión exitoso");
      login(); // ✅ Activar sesión
      navigate("/map");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page-div">
      <button className="back-to-map" onClick={() => navigate("/home")}>
        Volver al mapa
      </button>

      <div className="div-register">
        <p>¡Nos alegramos de volver a verte!</p>
        <p>
          <u>Ingresa tus datos para iniciar sesión</u>. Si no tienes una
          cuenta, pulsa el siguiente botón para ir a la página de{" "}
          <b>Registro</b>.
        </p>
        <button className="button-register" onClick={() => navigate("/register")}>
          Registrarme
        </button>
      </div>

      <div className="div-login-form">
        <p>Iniciar Sesión</p>
        <form className="form-login" onSubmit={HandleLogin}>
          <div className="input-wrapper">
            <img src={emailIcon} className="form-icon" alt="email" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
          </div>

          <div className="input-wrapper">
            <img src={passwordIcon} className="form-icon" alt="contraseña" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>

          <button type="submit" className="button-login-form" onClick={() => navigate("/map")}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
