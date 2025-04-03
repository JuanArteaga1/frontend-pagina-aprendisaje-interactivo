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
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div>
      <Navbar />

      {/* Carrusel de imágenes */}
      <div className="hero w-full max-w-screen-lg mx-auto mt-4">
        <Slider {...settings}>
          <div className="relative w-full h-[500px]">
            <img
              src="/img/uni.jpg"
              alt="Imagen 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="relative w-full h-[500px]">
            <img
              src="/img/uni1.jpg"
              alt="Imagen 2"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="relative w-full h-[500px]">
            <img
              src="/img/uni2.jpg"
              alt="Imagen 3"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </Slider>

        {/* Botón en la parte inferior izquierda */}
        <button
          className="absolute bottom-4 left-4 bg-yellow-500 text-white px-6 py-2 rounded-md shadow-lg hover:bg-blue-700 transition"
          onClick={() => navigate("/login")}
        >
          INGRESO AQUÍ
        </button>
      </div>

      {/* Sección de categorías */}
      <div className="categories flex justify-center gap-6 mt-10">
        <CategoryBox title="FÍSICA" image="/img/physics.png" path="/Fisica" />
        <CategoryBox title="ING CIVIL" image="/img/civil.png" path="/IngCivil" />
        <CategoryBox title="MATEMÁTICAS" image="/img/math.png" path="/Matematicas" />
      </div>

      {/* Información de la universidad */}
      <div className="university-info text-center mt-10 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Información de la Universidad</h3>
        <p>Calle 5 No. 3-85 Popayán, Colombia</p>
        <p>PBX: (602) 8222295</p>
        <p>Whatsapp: 320 675 0464</p>
        <p>Código ICFES 2849</p>

        <div className="social-media mt-4">
          <h4 className="font-semibold mb-2">Síguenos en:</h4>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Facebook
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

