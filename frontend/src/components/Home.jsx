import { useNavigate } from "react-router-dom";
import "./Home.css";
import logoReact from "../assets/oasis.png";
import fuenteImg from "../assets/fuente.png";
import bancoImg from "../assets/banco.png";
import perroImg from "../assets/perro.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Bienvenido a Oasis</h1>
      <h2>
        <b>Conoce tu ciudad. Encuentra aquello que está escondido.</b>
      </h2>

      <div className="content-row">
        <div className="gallery-div">
          <p>
            Busca <strong>fuentes</strong> para hidratarte, <strong>bancos</strong> para sentarte a cotillear, y{" "}
            <strong>parques caninos</strong> donde tu perro socializa más que tú.
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
        </div>

        <div className="buttons-div">
          <p>
            <strong>Pincha en nuestro logo</strong> para empezar a usar nuestra web
          </p>
          <img
            src={logoReact}
            alt="Logo"
            className="logo"
            onClick={() => navigate("/map")}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
}
