import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useProyectos } from "../context/ProyectoContext";

const AplicacionesMoviles = () => {
  const navigate = useNavigate(); // Hook para redireccionar entre rutas
  const { Proyectos, TraerProyectos } = useProyectos(); // Obtener datos del contexto de proyectos
  const [seccionActual, setSeccionActual] = useState("Aplicaciones Moviles"); // Estado para mostrar la sección actual

  useEffect(() => {
    // Al cargar el componente, se traen los proyectos disponibles
    TraerProyectos();
  }, []);

  console.log(Proyectos); // Mostrar los proyectos en consola para depuración

  // Memorizar el listado de proyectos ordenado por fecha (más recientes primero)
  const proyectosOrdenados = useMemo(() => {
    return [...Proyectos].sort(
      (a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion)
    );
  }, [Proyectos]);

  // Agrupar los proyectos por materia (o categoría), usando los proyectos ya ordenados
  const proyectosAgrupados = proyectosOrdenados.reduce((acc, proyecto) => {
    const categoria = proyecto.materia?.nombre || "Sin categoría"; // Si no hay materia, usar "Sin categoría"
    if (!acc[categoria]) acc[categoria] = []; // Si no existe aún el grupo, crearlo
    acc[categoria].push(proyecto); // Agregar el proyecto a su grupo correspondiente
    return acc;
  }, {});

  return (
    <div className="aplicaciones-moviles">
      {/* Navbar de la aplicación */}
      <Navbar />

      {/* Sección de portada */}
      <div className="imagen-seccion">
        <img src="img/aplicacionesportada.png" alt="" />
        <h1 className="titulo-seccion">Ahora estás en: {seccionActual}</h1>
      </div>

      {/* Contenedor principal de proyectos agrupados por categoría */}
      <div className="contenido-proyectos">
        {Object.entries(proyectosAgrupados).map(([categoria, items]) => (
          <div key={categoria} className="categoria">
            <h2>{categoria}</h2>
            {items.length > 0 ? (
              <div className="cards-container">
                {/* Mostrar cada proyecto como una tarjeta */}
                {items.map((app, i) => {
                  // Limpiar la ruta de la imagen (reemplazar \ por /)
                  const rutaLimpia = app.urlimg?.replace(/\\/g, "/");
                  // Construir la URL completa de la imagen
                  const imagenURL = `http://localhost:3000/uploads/${rutaLimpia?.split("uploads/")[1]}`;

                  return (
                    <div key={i} className="card">
                      <div className="card-inner">
                        {/* Parte frontal de la tarjeta: imagen */}
                        <div className="card-front">
                          <img
                            src={imagenURL}
                            alt={app.nombre_proyecto}
                            className="card-img"
                          />
                        </div>
                        {/* Parte trasera de la tarjeta: información y botón */}
                        <div className="card-back">
                          <h3><strong>{app.nombre_proyecto}</strong></h3>
                          <p>{app.descripcion || "Sin descripción."}</p>
                          <p><strong>Materia:</strong> {app.materia?.nombre || "Sin materia"}</p>
                          <p><strong>Autor:</strong> {app.autores || "No hay autor"}</p>
                          <button onClick={() => navigate(`/detalle/${app._id}`)}>
                            Ver más
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Mensaje si no hay proyectos en esta categoría
              <p style={{ marginLeft: "10px" }}>No hay aplicaciones disponibles.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AplicacionesMoviles;
