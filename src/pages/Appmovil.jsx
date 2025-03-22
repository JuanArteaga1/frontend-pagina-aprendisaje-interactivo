import React, { useState } from "react";
import Navbar from "../components/Navbar";

const AplicacionesMoviles = () => {
  const [loggedIn] = useState(true);
  const [appSeleccionada, setAppSeleccionada] = useState(null);

  const aplicaciones = [
    { id: 1, nombre: "App 1", descripcion: "Aplicación de productividad", imagen: "/img/app1.jpg" },
    { id: 2, nombre: "App 2", descripcion: "Aplicación de entretenimiento", imagen: "/img/app2.jpg" },
    { id: 3, nombre: "App 3", descripcion: "Aplicación educativa", imagen: "/img/app3.jpg" },
  ];

  return (
    <div>
      <Navbar loggedIn={loggedIn} />
      <h1 style={{ marginBottom: "10px", display: "block", marginLeft: "190px" }}>Aplicaciones Móviles</h1>
      
      {/* Banner */}
      <div className="ban">
        <img src="/img/970x250.jpg" alt="Banner aplicaciones móviles" />

        {/* Cuadro flotante con info de la app seleccionada */}
        <div className="app-info-box">
          {appSeleccionada ? (
            <div style={{ position: "relative", textAlign: "center" }}>
              <img
                src={appSeleccionada.imagen}
                alt={appSeleccionada.nombre}
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
                borderRadius: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.5)"
              }}>
                <h2>{appSeleccionada.nombre}</h2>
                <p>{appSeleccionada.descripcion}</p>
              </div>
            </div>
          ) : (
            <p>Selecciona una aplicación para ver la información</p>
          )}
        </div>
      </div>
      
      <h2 style={{ marginTop: "20px", textAlign: "left", marginLeft: "190px" }}>Aplicaciones</h2>

      {/* Contenedor de aplicaciones */}
      <div className="aplicaciones-container">
        {aplicaciones.map((app) => (
          <div key={app.id} className="aplicacion" onClick={() => setAppSeleccionada(app)}>
            <img src={app.imagen} alt={app.nombre} />
            <div className="overlay">
              <h3>{app.nombre}</h3>
              <p>{app.descripcion}</p>
              <button onClick={(e) => {
                e.stopPropagation();
                setAppSeleccionada(app);
              }}>
                Seleccionar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AplicacionesMoviles;

