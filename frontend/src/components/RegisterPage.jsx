import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { app } from "../assets/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile
} from "firebase/auth";

import nameIcon from "../assets/nameIcon.png";
import emailIcon from "../assets/emailIcon.png";
import passwordIcon from "../assets/passwordIcon.png";
import { useAuth } from "./AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const HandleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      console.log("Usuario creado exitosamente con nombre.");
      login(); // activa la sesión (esto depende de tu AuthContext)
      navigate("/map"); // redirige al mapa
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-page-div">
      <button className="back-to-map" onClick={() => navigate("/map")}>
        Volver al mapa
      </button>

      <div className="div-register-form">
        <p>Registrarse</p>
        <form className="form-register" onSubmit={HandleSignUp}>
          <div className="input-wrapper">
            <img src={nameIcon} className="form-icon" />
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              required
            />
          </div>

          <div className="input-wrapper">
            <img src={emailIcon} className="form-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
          </div>

          <div className="input-wrapper">
            <img src={passwordIcon} className="form-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>

          <div className="input-wrapper">
            <img src={passwordIcon} className="form-icon" />
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              placeholder="Repetir contraseña"
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button className="button-register-form" type="submit">
            Registrarse
          </button>
        </form>
      </div>

      <div className="div-login">
        <p>¡Bienvenido, nuevo usuario!</p>
        <p>
          <u>Ingresa tus datos para crear una cuenta nueva</u>. Si ya tienes
          una cuenta, pulsa el siguiente botón para ir a la página de{" "}
          <b>Inicio de Sesión</b>.
        </p>
        <button className="button-login" onClick={() => navigate("/login")}>
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}
