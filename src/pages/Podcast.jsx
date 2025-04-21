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

      {/* Imagen de portada con texto encima */}
      <div className="relative w-full">
        <img src="img/podcast.png" alt="" className="w-full object-cover max-h-[400px]" />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold" style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}>
          Ahora estás en: {seccionActual}
        </h1>
      </div>


      <h2 className="text-left pl-[200px] text-2xl font-bold mt-5 text-gray-800 w-full">Lista de Episodios</h2>

      {/* Contenedor de episodios con tarjetas interactivas */}
      <div className="flex justify-center gap-5 flex-wrap mt-8">
        {episodios.map((ep) => (
          <div key={ep.id} className="card">
            <div className="card-inner">
              {/* Lado frontal */}
              <div className="card-front">
                <img src={ep.imagen} alt={ep.titulo} className="card-img" />
              </div>

              {/* Lado trasero */}
              <div className="card-back">
                <h3>{ep.titulo}</h3>
                <p>{ep.descripcion}</p>
                <button
                  onClick={() => navigate(`/episodio/${ep.id}`)}
                  className="mt-2 px-4 py-2 bg-[#121e3b] text-white rounded hover:bg-white hover:text-black transition"
                >
                  Ver más
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcast;
