import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Podcast = () => {
  const [seccionActual, setSeccionActual] = useState("Podcasts");
  const navigate = useNavigate();

  const episodios = [
    { id: 1, titulo: "Episodio 1", descripcion: "Introducción al aprendizaje", imagen: "/img/pdexample.jpg" },
    { id: 2, titulo: "Episodio 2", descripcion: "Técnicas avanzadas", imagen: "/img/pdexample.jpg" },
    { id: 3, titulo: "Episodio 3", descripcion: "Casos de éxito", imagen: "/img/pdexample.jpg" },
    { id: 4, titulo: "Episodio 4", descripcion: "Casos de éxito", imagen: "/img/pdexample.jpg" },
    { id: 5, titulo: "Episodio 5", descripcion: "Casos de éxito", imagen: "/img/pdexample.jpg" },
    { id: 6, titulo: "Episodio 6", descripcion: "Casos de éxito", imagen: "/img/pdexample.jpg" },
    { id: 7, titulo: "Episodio 7", descripcion: "Casos de éxito", imagen: "/img/pdexample.jpg" },
  ];

  return (
    <div>
      <Navbar />

      <div className="imagen-seccion">
                <img src="img/podcast.png" alt="" />
                <h1 className="titulo-seccion">Ahora estás en: {seccionActual}</h1> 
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
