import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Asegúrate de que esta ruta sea correcta.
import Slider from "react-slick"; // Importa el Slider de react-slick
import CategoryBox from "../components/CategoryBox";


const Home = () => {
  const navigate = useNavigate();

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Navbar /> {/* Navbar sin props para simplificar */}

      {/* Carrusel de imágenes */}
      <div className="hero">
        <Slider {...settings}>
          <div>
            <img src="/img/uni.jpg" alt="Imagen 1" />
          </div>
          <div>
            <img src="/img/uni1.jpg" alt="Imagen 2" />
          </div>
          <div>
            <img src="/img/uni2.jpg" alt="Imagen 3" />
          </div>
        </Slider>

        {/* Botón en la parte inferior izquierda */}
        <button className="hero-button" onClick={() => navigate("/login")}>
          INGRESO AQUÍ
        </button>
      </div>

      {/* Sección de categorías */}
      <div className="categories">
        <CategoryBox title="FÍSICA" image="/img/physics.png" path="/Fisica" />
        <CategoryBox title="ING CIVIL" image="/img/civil.png" path="/IngCivil" />
        <CategoryBox title="MATEMÁTICAS" image="/img/math.png" path="/Matematicas" />
      </div>

      <div className="university-info">
        <h3>Información de la Universidad</h3>
        <p>Calle 5 No. 3-85 Popayán, Colombia</p>
        <p>PBX: (602) 8222295</p>
        <p>Whatsapp: 320 675 0464</p>
        <p>Código ICFES 2849</p>

        <div className="social-media">
          <h4>Síguenos en:</h4>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>

    </div>
  );
};

export default Home;
