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
      <div className="imagen-seccion">
                <img src="img/DSC05007.JPG" alt="Imagen de simulaciones" />
                <h1 className="titulo-seccion">Ahora estás en: {seccionActual}</h1>
            </div>

      <h2 className="text-left pl-[200px] text-2xl font-bold mt-5 text-gray-800 w-full">Lista de Episodios</h2>

      {/* Contenedor de episodios con tarjetas interactivas */}
      <div className="flex justify-center gap-5 flex-wrap mt-8">
        {Podcast?.data.map((ep) => {
          const rutaLimpia = ep.ArchivoImagen.replace(/\\/g, "/");
          console.log(rutaLimpia)
          const imagenURL = `http://localhost:3000/uploads/${rutaLimpia?.split("uploads/")[1]}`;;

          return (
            <div key={ep._id} className="card">
              <div className="card-inner">
                {/* Lado frontal */}
                <div className="card-front">
                  <img src={imagenURL} alt={ep.titulo} className="card-img" />
                </div>

                {/* Lado trasero */}
                <div className="card-back">
                  <h3>{ep.nombre_proyecto}</h3>
                  <p>{ep.descripcion}</p>
                  <p>{ep.materia}</p>
                  <p>{ep.autores}</p>
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
