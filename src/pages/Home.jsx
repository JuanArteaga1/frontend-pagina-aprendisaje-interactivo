import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Slider from "react-slick";
import CategoryBox from "../components/CategoryBox";
import { PrevArrow, NextArrow } from "../components/CustomArrows";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />

      {/* Carrusel de imágenes */}
      <div className="hero w-full mt-4 relative max-h-[600px] overflow-hidden">
        <Slider {...settings} className="h-full">
          {[1, 2, 3].map((n) => (
            <div key={n} className="relative w-full h-[300px] sm:h-[400px] md:h-[600px]">
              <img
                src={`/img/uni${n === 1 ? "" : n - 1}.jpg`}
                alt={`Imagen ${n}`}
                className="w-full h-full object-cover"
              />
              <button
                className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-white px-6 py-3 rounded-2xl border-2 border-[#3C64C9] shadow-lg transition font-bold cursor-pointer bg-[#3C64C9] hover:bg-[#2a4fa2]`}
                onClick={() =>
                  navigate(n === 1 ? "/simulaciones" : n === 2 ? "/investigaciones" : "/podcast")
                }
              >
                {n === 1
                  ? "Explora nuestras simulaciones"
                  : n === 2
                    ? "Consulta nuestras investigaciones"
                    : "Explora nuestro podcast"}
              </button>
            </div>
          ))}
        </Slider>
      </div>


      {/* Sección de categorías */}
      <div className="categories flex flex-wrap justify-evenly gap-4 mt-10 w-full px-4">
        <CategoryBox title="FÍSICA" image="/img/physics.png" path="/Fisica" />
        <CategoryBox title="ING CIVIL" image="/img/civil.png" path="/IngCivil" />
        <CategoryBox title="MATEMÁTICAS" image="/img/math.png" path="/Matematicas" />
      </div>

      {/* Sección Quiénes somos - Versión Final */}
      <div
        className="w-screen relative left-1/2 right-1/2 -mx-[50vw] mt-20" // Añadido mt-20 para separación superior
        style={{
          opacity: 0,
          transform: 'translateY(20px)',
          animation: 'fadeInUp 1s forwards 0.3s'
        }}
      >
        <div className="about-us flex flex-col md:flex-row justify-between items-center py-16 px-4 bg-black/25 backdrop-blur-sm min-h-[500px]">
          <div className="text-left w-full md:w-2/3 mb-8 md:mb-0 md:pr-10 max-w-7xl mx-auto">
            <h3 className="text-4xl font-semibold mb-8 text-white leading-tight">¿Quiénes somos?</h3>
            <p className="mb-10 text-white text-xl leading-relaxed max-w-4xl">
              Somos una universidad comprometida con la educación, la investigación y el desarrollo
              de nuestra comunidad académica. Con una tradición de excelencia, buscamos transformar la
              educación superior en Colombia.
            </p>
            <button
              onClick={() => navigate("/quienes-somos")}
              className="bg-transparent text-white px-10 py-5 rounded-full border-4 border-white/70 hover:bg-white/10 transition duration-300 font-bold shadow-md text-xl cursor-pointer hover:cursor-[url('cursor-link.png'),_pointer]"
            >
              Conoce más sobre nosotros
            </button>
          </div>
          <div className="w-full md:w-1/3 h-full flex items-center max-w-2xl mx-auto">
            <img
              src="/img/imagen_uniautonoma.jpg"
              alt="Quiénes somos"
              className="w-full h-auto max-h-[400px] object-cover shadow-xl"
            />
          </div>
        </div>
      </div>


      {/* Información de la universidad */}
      <div className="university-info text-center mt-10 p-6 bg-[#3C64C9] text-white">
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
              className="text-white hover:underline"
            >
              Facebook
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
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
