import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const episodios = [
  {
    id: 1,
    titulo: "Episodio 1",
    descripcion: "Introducción al aprendizaje",
    autor: "Juan Pérez",
    fecha: "15 de marzo de 2024",
    imagen: "/img/pdexample.jpg",
    spotify: "https://open.spotify.com/track/example1",
  },
  {
    id: 2,
    titulo: "Episodio 2",
    descripcion: "Técnicas avanzadas",
    autor: "María Gómez, Pedro Rodríguez",
    fecha: "22 de marzo de 2024",
    imagen: "/img/pdexample.jpg",
    spotify: "https://open.spotify.com/track/example2",
  },
  {
    id: 3,
    titulo: "Episodio 3",
    descripcion: "Casos de éxito",
    autor: "Carlos López",
    fecha: "29 de marzo de 2024",
    imagen: "/img/pdexample.jpg",
    spotify: "https://open.spotify.com/track/example3",
  },
];

const Episodio = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const episodio = episodios.find(ep => ep.id === parseInt(id));

  if (!episodio) {
    return <h2>Episodio no encontrado</h2>;
  }

  return (
    <div>
      <Navbar loggedIn={true} />

      <div className="episodio-container">

        {/* Contenedor con dos columnas */}
        <div className="episodio-layout">
          {/* Columna Izquierda */}
          <div className="episodio-left">
            <h1 className="episodio-titulo">{episodio.titulo}</h1>
            <img className="episodio-img" src={episodio.imagen} alt={episodio.titulo} />
            <a className="spotify-link" href={episodio.spotify} target="_blank" rel="noopener noreferrer">
              🎵 Escuchar en Spotify
            </a>
          </div>

          {/* Columna Derecha */}
          <div className="episodio-right">
            <p><strong>Descripción:</strong></p>
            <p className="episodio-descripcion">{episodio.descripcion}</p>
            <p className="episodio-autor"><strong>Autor(es):</strong> {episodio.autor}</p>
            <p className="episodio-fecha"><strong>Fecha de publicación:</strong> {episodio.fecha}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episodio;
