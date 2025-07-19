import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { app } from "../assets/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth
} from "firebase/auth";

import nameIcon from "../assets/nameIcon.png";
import emailIcon from "../assets/emailIcon.png";
import passwordIcon from "../assets/passwordIcon.png";
import { useAuth } from "./AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const { login } = useAuth(); // ✅ Hook DENTRO del componente

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");


  const HandleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      //Ahora tengo que hacer una llamada al backend para que guarde al user en la base de datos
      await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          is_admin: false,
          name: name
        })
      })

      console.log("Usuario creado exitosamente.");
      login(); // ✅ activa la sesión
      navigate("/");
    } catch (error) {
      console.log(error.message);
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
              onChange={(e) =>setName(e.target.value)}
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
            <input type="password" placeholder="Repetir contraseña" />
          </div>

          <button className="button-register-form" onClick={HandleSignUp}>
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
