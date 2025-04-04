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

      <div className="investigacion-container">
        {/* Diseño en dos columnas */}
        <div className="investigacion-layout">
          {/* Columna Izquierda */}
          <div className="investigacion-left">
            <h1 className="investigacion-titulo">{investigacion.titulo}</h1>
            <p className="investigacion-descripcion">
              <strong>Descripción:</strong> {investigacion.descripcion}
            </p>
            {/* Mostrar botón de descarga solo si hay un archivo disponible */}
            {investigacion.archivo && investigacion.id !== 2 && (
              <a
                className="descargar-boton"
                href={investigacion.archivo}
                download
              >
                ⬇️ Descargar documento
              </a>
            )}
          </div>

          {/* Línea separadora */}
          <div className="linea-separadora"></div>

          {/* Columna Derecha */}
          <div className="investigacion-right">
            <p className="investigacion-autor">
              <strong>Autor(es):</strong> {investigacion.autor}
            </p>
            <p className="investigacion-fecha">
              <strong>Fecha de publicación:</strong> {investigacion.fecha}
            </p>
            <a
              className="fuente-link"
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