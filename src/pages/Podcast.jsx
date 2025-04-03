import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Podcast = () => {
  const [loggedIn] = useState(true);
  const [episodioActual, setEpisodioActual] = useState(null);
  const [reproduciendo, setReproduciendo] = useState(false);

  const episodios = [
    { id: 1, titulo: "Episodio 1", descripcion: "Introducción al aprendizaje", imagen: "/img/pdexample.jpg", audio: "/audio/episodio1.mp3" },
    { id: 2, titulo: "Episodio 2", descripcion: "Técnicas avanzadas", imagen: "/img/pdexample.jpg", audio: "/audio/episodio2.mp3" },
    { id: 3, titulo: "Episodio 3", descripcion: "Casos de éxito", imagen: "/img/pdexample.jpg", audio: "/audio/episodio3.mp3" },
  ];

  return (
    <div>
      <Navbar loggedIn={loggedIn} />
      <h1 style={{ marginBottom: "10px", display: "block", marginLeft: "190px" }}>Podcast</h1>
      {/* Banner */}
      <div className="ban">
        <img src="/img/podcast.png" alt="Banner podcast" />

        {/* Cuadro flotante con info del episodio seleccionado */}
        <div className="episodio-info-box">
          {episodioActual ? (
            <div style={{ position: "relative", textAlign: "center" }}>
              <img
                src={episodioActual.imagen}
                alt={episodioActual.titulo}
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "cover",
                  borderRadius: "10px"
                }}
              />
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                padding: "10px",
                borderRadius: "10px"
              }}>
                <h2>{episodioActual.titulo}</h2>
                <p>{episodioActual.descripcion}</p>
              </div>
            </div>
          ) : (
            <p>Selecciona un episodio para ver la información</p>
          )}
        </div>


        {/* Botón para escuchar */}
        <button className="button-podcast" onClick={() => setReproduciendo(true)}>
          Escuchar
        </button>
      </div>

      <h2 style={{ marginTop: "20px", textAlign: "left", marginLeft: "190px" }}>Episodios</h2>

      {/* Contenedor de episodios */}
      <div className="episodios-container">
        {episodios.map((ep) => (
          <div key={ep.id} className="episodio" onClick={() => setEpisodioActual(ep)}>
            <img src={ep.imagen} alt={ep.titulo} />
            <div className="overlay">
              <h3>{ep.titulo}</h3>
              <p>{ep.descripcion}</p>
              <button onClick={(e) => {
                e.stopPropagation();
                setEpisodioActual(ep);
                setReproduciendo(false);
              }}>
                Seleccionar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de reproducción */}
      {reproduciendo && episodioActual && (
        <div className="reproductor">
          <audio controls autoPlay>
            <source src={episodioActual.audio} type="audio/mp3" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      )}
    </div>
  );
};

export default Podcast;
