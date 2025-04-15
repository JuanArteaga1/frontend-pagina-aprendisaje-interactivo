import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

// Datos de ejemplo de investigaciones
const investigaciones = [
  {
    id: 1,
    titulo: "Avances en IA",
    descripcion: "Exploramos los últimos avances en inteligencia artificial.",
    autor: "Dr. Juan Pérez",
    fecha: "10 de enero de 2024",
    archivo: "/docs/avances_IA.pdf", // Ruta de ejemplo del archivo
    fuente: "https://ejemplo.com/investigacion-ia",
  },
  {
    id: 2,
    titulo: "Descubrimientos médicos",
    descripcion: "Nuevas terapias para enfermedades crónicas.",
    autor: "Dra. María Gómez",
    fecha: "5 de febrero de 2024",
    archivo: "", // No tiene archivo disponible
    fuente: "https://ejemplo.com/descubrimientos-medicos",
  },
  {
    id: 3,
    titulo: "Energía renovable",
    descripcion: "Investigación sobre nuevas fuentes de energía sostenible.",
    autor: "Dr. Carlos Ramírez",
    fecha: "20 de marzo de 2024",
    archivo: "/docs/energia_renovable.pdf",
    fuente: "https://ejemplo.com/energia-renovable",
  },
  {
    id: 4,
    titulo: "Computación Cuántica",
    descripcion: "Análisis de los avances en computación cuántica y sus aplicaciones.",
    autor: "Dra. Laura Fernández",
    fecha: "15 de abril de 2024",
    archivo: "/docs/computacion_cuantica.pdf",
    fuente: "https://ejemplo.com/computacion-cuantica",
  }
];

const InvestigacionDetalle = () => {
  const { id } = useParams();
  const investigacion = investigaciones.find((inv) => inv.id === parseInt(id));

  // Si no se encuentra la investigación, mostrar un mensaje
  if (!investigacion) {
    return <h2>Investigación no encontrada</h2>;
  }

  return (
    <div>
      <Navbar />

      <div className="investigacion-container p-5 flex justify-center">
        <div className="investigacion-layout flex bg-white shadow-lg rounded-lg p-5 max-w-4xl w-full">
          {/* Columna Izquierda */}
          <div className="investigacion-left flex-1 p-5">
            <h1 className="investigacion-titulo text-2xl font-bold mb-4">{investigacion.titulo}</h1>
            <p className="investigacion-descripcion text-base mb-4">
              <strong>Descripción:</strong> {investigacion.descripcion}
            </p>
            {/* Mostrar botón de descarga solo si hay un archivo disponible */}
            {investigacion.archivo && investigacion.id !== 2 && (
              <a
                className="descargar-boton inline-block bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-700"
                href={investigacion.archivo}
                download
              >
                ⬇️ Descargar documento
              </a>
            )}
          </div>

          {/* Línea separadora */}
          <div className="linea-separadora w-px bg-gray-300 mx-5"></div>

          {/* Columna Derecha */}
          <div className="investigacion-right flex-1 p-5">
            <p className="investigacion-autor text-base mb-2">
              <strong>Autor(es):</strong> {investigacion.autor}
            </p>
            <p className="investigacion-fecha text-base mb-4">
              <strong>Fecha de publicación:</strong> {investigacion.fecha}
            </p>
            <a
              className="fuente-link inline-block text-blue-500 font-bold hover:underline"
              href={investigacion.fuente}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 Ver fuente
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestigacionDetalle;
