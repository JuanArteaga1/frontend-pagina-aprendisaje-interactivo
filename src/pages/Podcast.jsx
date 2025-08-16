import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { usePodcast } from "../context/PodcastContext";


const Podcast = () => {
  const [seccionActual, setSeccionActual] = useState("Podcasts");
  const { TraerPodcast, Podcast } = usePodcast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      await TraerPodcast();
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    obtenerDatos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="min-h-screen flex flex-col justify-center items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-sm text-cyan-600">Cargando podcasts...</p>
        </div>
      </div>
    );
  }

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
          const rutaLimpia = ep.ArchivoImagen
            ? ep.ArchivoImagen.replace(/\\/g, "/")
            : null;

          const imagenURL = rutaLimpia
            ? `http://localhost:3000/uploads/${rutaLimpia.split("uploads/")[1]}`
            : "img/default-podcast.png"; // 👈 usa una imagen por defecto si no hay portada

          return (
            <div key={ep._id} className="card">
              <div className="card-inner">
                {/* Lado frontal */}
                <div className="card-front">
                  <img src={imagenURL} alt={ep.nombre_proyecto} className="card-img" />
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
