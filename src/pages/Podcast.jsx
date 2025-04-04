import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Podcast = () => {
  const navigate = useNavigate();

  const episodios = [
    { id: 1, titulo: "Episodio 1", descripcion: "Introducción al aprendizaje", imagen: "/img/pdexample.jpg" },
    { id: 2, titulo: "Episodio 2", descripcion: "Técnicas avanzadas", imagen: "/img/pdexample.jpg" },
    { id: 3, titulo: "Episodio 3", descripcion: "Casos de éxito", imagen: "/img/pdexample.jpg" },
  ];

  return (
    <div>
      <Navbar />

      {/* Título mejorado */}
      <h1 className="titulo-seccion">Podcasts</h1>

      {/* Banner más redondeado */}
      <div className="podcast-banner">
        <img src="/img/podcast.png" alt="Banner Podcast" />
      </div>

      <h2 className="subtitulo-seccion">Lista de Episodios</h2>

      {/* Contenedor de episodios con tarjetas interactivas */}
      <div className="episodios-container">
        {episodios.map((ep) => (
          <div key={ep.id} className="card">
            <div className="card-inner">
              {/* Lado frontal */}
              <div className="card-front">
                <img src={ep.imagen} alt={ep.titulo} />
              </div>

              {/* Lado trasero con botón para navegar */}
              <div className="card-back">
                <h3>{ep.titulo}</h3>
                <p>{ep.descripcion}</p>
                <button onClick={() => navigate(`/episodio/${ep.id}`)}>Ver más</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcast;
