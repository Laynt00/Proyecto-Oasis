import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import fuente1 from "../assets/carrusel-fuente1.jpg";
import fuente2 from "../assets/carrusel-fuente2.jpg";
import banco1 from "../assets/carrusel-banco1.jpg";
import banco2 from "../assets/carrusel-banco2.jpg";
import parquecanino1 from "../assets/carrusel-parquecanino1.jpg";
import parquecanino2 from "../assets/carrusel-parquecanino2.jpg";
import creatorsBackground from "../assets/creatorsBackground.jpg"
import logoReact from "../assets/oasis.png";

function useDelayedCarousel(setIndexFn, delayStart, interval, imagesLength) {
  useEffect(() => {
    const delay = setTimeout(() => {
      const timer = setInterval(() => {
        setIndexFn(prev => (prev + 1) % imagesLength);
      }, interval);
      // Limpiar el intervalo
      return () => clearInterval(timer);
    }, delayStart);

    // Limpiar el timeout si se desmonta antes
    return () => clearTimeout(delay);
  }, []);
}

export default function Home() {
  const navigate = useNavigate();
  const imagesSetFuente = [fuente1, fuente2];
  const imagesSetBanco = [banco1, banco2];
  const imagesSetParqueCanino = [parquecanino1, parquecanino2];

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);

  useDelayedCarousel(setIndex1, 0, 9000, imagesSetFuente.length);
  useDelayedCarousel(setIndex2, 3000, 9000, imagesSetBanco.length);
  useDelayedCarousel(setIndex3, 6000, 9000, imagesSetParqueCanino.length);

  // 👇 Popup añadido
  const [popupVisible, setPopupVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('ok');
  const [imagen, setImagen] = useState(null);

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleCrearRegistro = () => {
    const nuevoRegistro = { nombre, estado, imagen };
    console.log("Nuevo registro:", nuevoRegistro);
    setPopupVisible(false);
  };

  return (
    <div className="home-page-content">
      <div className="about-us-div">
        <p>SOBRE NOSOTROS</p>
        <p>En Oasis, creemos que las ciudades están llenas de pequeños tesoros ocultos: una <span className="underlined-text">fuente de agua fresca</span> en verano, un <span className="underlined-text">banco a la sombra</span> para descansar, un <span className="underlined-text">parque canino</span>  donde tu mascota pueda correr libremente... Espacios útiles, accesibles y muchas veces invisibles. <br /><br />
        Nuestra misión es ayudarte a encontrar esos lugares que no suelen estar tan señalizados, pero que marcan la diferencia en tu día a día. Oasis nace con la idea de ser ese punto de referencia inesperado, como <span className="underlined-text">un lugar de descanso en mitad del camino</span> , donde recargar energías y reconectar con tu entorno urbano. <br /><br />
        A través de un mapa interactivo y colaborativo, te invitamos a descubrir y compartir estos rincones. Porque cada persona debería tener a su alcance un pequeño oasis, sin importar por dónde camine.</p>
      </div>
      <div className="carrusel-div">
        <div className="carousel-section">
          {imagesSetFuente.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Fuente ${i}`}
              className={`carousel-image ${i === index1 ? 'active' : ''}`}
            />
          ))}
          <div className="image-overlay">
            <p>FUENTES</p>
            <p>"Encuentra fuentes de agua para saciar tu sed cuando más lo necesites"</p>
          </div>
        </div>
        <div className="carousel-section">
          {imagesSetBanco.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Banco ${i}`}
              className={`carousel-image ${i === index2 ? 'active' : ''}`}
            />
          ))}
          <div className="image-overlay">
            <p>BANCOS</p>
            <p>"Siempre es bueno saber donde hayar un asiento para descansar tras un paseo"</p>
          </div>
        </div>
        <div className="carousel-section">
          {imagesSetParqueCanino.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Parque Canino ${i}`}
              className={`carousel-image ${i === index3 ? 'active' : ''}`}
            />
          ))}
          <div className="image-overlay">
            <p>PARQUES CANINOS</p>
            <p>"Vuestras mascotas también necesitan pasar el rato en una zona preparada para ellos"</p>
          </div>
        </div>
      </div>
      <div
        className="creators-div"
        style={{ backgroundImage: `url(${creatorsBackground})` }}
      >
        <p>#WeAreOasis</p>
      </div>

      <div className="logo-div">
        <svg width="200" height="200" className="curved-text">
          <defs>
            <path
              id="curve"
              d="M 25 175 A 160 160 0 0 1 175 25"
              fill="none"
            />
          </defs>
          <text width="100%">
            <textPath href="#curve" startOffset="0%">
              Pincha aquí para acceder al mapa
            </textPath>
          </text>
        </svg>
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