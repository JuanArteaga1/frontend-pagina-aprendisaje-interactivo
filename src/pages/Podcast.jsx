import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { usePodcast } from "../context/PodcastContext";


const Podcast = () => {
  const [seccionActual, setSeccionActual] = useState("Podcasts");
  const { TraerPodcast, Podcast } = usePodcast();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatos = async () => {
      await TraerPodcast();
    };
    obtenerDatos();
  }, []);

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
        {Podcast?.data.map((ep) => {
          const rutaLimpia = ep.ArchivoImagen.replace(/\\/g, "/");
          const imagenURL = `http://localhost:3000/${rutaLimpia}`;

          return (
            <div key={ep._id} className="card">
              <div className="card-inner">
                {/* Lado frontal */}
                <div className="card-front">
                  <img src={imagenURL} alt={ep.titulo} className="card-img" />
                </div>

                {/* Lado trasero */}
                <div className="card-back">
                  <h3>{ep.titulo}</h3>
                  <p>{ep.descripcion}</p>
                  <a
                    href={ep.UrlAudio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block px-4 py-2 bg-[#121e3b] text-white rounded hover:bg-white hover:text-black transition"
                  >
                    Escuchar
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Podcast;
