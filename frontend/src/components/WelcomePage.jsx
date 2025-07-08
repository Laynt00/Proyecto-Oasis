import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import logoReact from "../assets/oasis.png";
import fuenteImg from "../assets/fuente.png";
import bancoImg from "../assets/banco.png";
import perroImg from "../assets/perro.png";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      {/* Logo con redirección al mapa */}
      <img
        src={logoReact}
        alt="Logo"
        className="logo"
        onClick={() => navigate("/home")}
        style={{ cursor: "pointer" }}
      />

      <h1>Bienvenido a Oasis</h1>
      <h2>Tu ciudad, tu pausa.</h2>
      <p>
        Encuentra <strong>fuentes</strong> para hidratarte, <strong>bancos</strong> para sentarte a cotillear, y <strong>parques caninos</strong> donde tu perro socializa más que tú.
      </p>

      <div className="features">
        <div className="feature-card">
          <img src={fuenteImg} alt="Fuente" />
          <span>Hidratación pública</span>
        </div>
        <div className="feature-card">
          <img src={bancoImg} alt="Banco" />
          <span>Descansa donde se cuece el barrio</span>
        </div>
        <div className="feature-card">
          <img src={perroImg} alt="Perro" />
          <span>Tu perro necesita socializar, tú también</span>
        </div>
      </div>

      <div className="welcome-buttons">
        <button className="primary" onClick={() => navigate("/login")}>Iniciar sesión</button>
        <button className="secondary" onClick={() => navigate("/register")}>Únete a Oasis</button>
      </div>
    </div>
  );
}
