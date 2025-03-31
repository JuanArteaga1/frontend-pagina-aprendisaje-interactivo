import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Asegúrate de que esta ruta sea correcta.

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar /> {/* Navbar sin props para simplificar */}

      {/* Imagen de fondo con botón de ingreso */}
      <div className="hero">
        <img src="/img/uni.jpg" alt="Bienvenida" />
        <button className="hero-button" onClick={() => navigate("/menuadministrador")}>
          INGRESO
        </button>
      </div>


      {/* Sección de categorías */}
      <div className="categories">
        <div className="category">
          <img src="/img/physics.png" alt="Física" />
          <p>FÍSICA</p>

        </div>
        <div className="category">
          <img src="/img/civil.png" alt="Ing Civil" />
          <p>ING CIVIL</p>
        </div>
        <div className="category">
          <img src="/img/math.png" alt="Matemáticas" />
          <p>MATEMÁTICAS</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
