import { useNavigate } from "react-router-dom";
import "./Home.css";
import logoReact from "../assets/oasis.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page-content">
      <div className="about-us-div">
        <p>sobre nosotros</p>
        <p>En Oasis, creemos que las ciudades están llenas de pequeños tesoros ocultos: una <span className="underlined-text">fuente de agua fresca</span> en verano, un <span className="underlined-text">banco a la sombra</span> para descansar, un <span className="underlined-text">parque canino</span>  donde tu mascota pueda correr libremente... Espacios útiles, accesibles y muchas veces invisibles. <br /><br />
        Nuestra misión es ayudarte a encontrar esos lugares que no suelen estar tan señalizados, pero que marcan la diferencia en tu día a día. Oasis nace con la idea de ser ese punto de referencia inesperado, como <span className="underlined-text">un lugar de descanso en mitad del camino</span> , donde recargar energías y reconectar con tu entorno urbano. <br /><br />
        A través de un mapa interactivo y colaborativo, te invitamos a descubrir y compartir estos rincones. Porque cada persona debería tener a su alcance un pequeño oasis, sin importar por dónde camine.</p>
      </div>
      <div className="logo-div">
        <p>Pincha aquí para acceder al mapa</p>
        <img
          src={logoReact}
          alt="Logo"
          className="logo"
          onClick={() => navigate("/map")}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
