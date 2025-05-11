import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UseTraerProyectos } from "../context/TraerProyectos"; // Asegúrate de importar bien el contexto

const InvestigacionDetalle = () => {
  const { id } = useParams();
  const { TraerProyectos, TraerProyectosT } = UseTraerProyectos();

  useEffect(() => {
    TraerProyectosT(); // Trae todos los proyectos cuando se monta el componente
  }, []);

  if (!TraerProyectos) {
    return <h2 className="p-10 text-center">Cargando...</h2>;
  }

  // Buscar la investigación específica por ID
  const investigacion = TraerProyectos.investigacion?.find(
    (inv) => inv._id === id
  );

  if (!investigacion) {
    return <h2 className="p-10 text-center">Investigación no encontrada</h2>;
  }

  return (
    <div>
      <Navbar />

      <div className="investigacion-container p-5 flex justify-center">
        <div className="investigacion-layout flex bg-white shadow-lg rounded-lg p-5 max-w-4xl w-full">
          {/* Columna Izquierda */}
          <div className="investigacion-left flex-1 p-5">
            <h1 className="text-2xl font-bold mb-4">{investigacion.titulo}</h1>
            <p className="text-base mb-4">
              <strong>Descripción:</strong> {investigacion.descripcion}
            </p>
            {investigacion.archivo && (
              <a
                className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700"
                href={investigacion.archivo}
                download
              >
                ⬇️ Descargar documento
              </a>
            )}
          </div>

          {/* Línea separadora */}
          <div className="w-px bg-gray-300 mx-5"></div>

          {/* Columna Derecha */}
          <div className="investigacion-right flex-1 p-5">
            <p className="text-base mb-2">
              <strong>Autor(es):</strong> {investigacion.autor}
            </p>
            <p className="text-base mb-4">
              <strong>Fecha de publicación:</strong> {investigacion.fecha}
            </p>
            {investigacion.fuente && (
              <a
                className="inline-block text-blue-500 font-bold hover:underline"
                href={investigacion.fuente}
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 Ver fuente
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigacionDetalle;
