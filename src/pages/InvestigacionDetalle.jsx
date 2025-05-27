import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UseTraerProyectos } from "../context/TraerProyectos";
import { useInvestigacion } from "../context/InvestigacionContext";
import { Download, FileText, CalendarDays, Users, Link as LinkIcon } from "lucide-react";

const InvestigacionDetalle = () => {
  const { id } = useParams();
  const { investigaciones, traerInvestigaciones } = useInvestigacion();

  useEffect(() => {
    if (!investigaciones.some(i => i._id === id)) {
      traerInvestigaciones();
    }
  }, [id, investigaciones, traerInvestigaciones]);

  const investigacion = investigaciones.find((inv) => inv._id === id);

  if (!investigacion) {
    return (
      <>
        <Navbar />
        <div className="p-8 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800">Cargando investigación...</h2>
        </div>
      </>
    );
  }

  // Construcción de URLs
  const fuenteURL = investigacion.urlArticulo;
  const imagenURL = investigacion.urlimg
    ? `http://localhost:3000/uploads/${investigacion.urlimg.replace(/\\/g, "/").split("uploads/").pop()}`
    : "img/placeholder.jpg";
  const archivoURL = investigacion.urlDoc?.replace(/\\/g, "/")
    ? `http://localhost:3000/uploads/${investigacion.urlDoc.replace(/\\/g, "/").split("uploads/").pop()}`
    : null;

  const handleDescarga = () => {
    if (!archivoURL) return;
    const link = document.createElement("a");
    link.href = archivoURL;
    link.download = archivoURL.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-gray-100">
          {/* Imagen */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden rounded-xl shadow-md border-2 border-white">
            <img
              src={imagenURL}
              alt={`Foto de ${investigacion.nombre_proyecto}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenedor texto + botón */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-1 gap-4 w-full">
            {/* Texto */}
            <div className="flex-1 space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
                {investigacion.nombre_proyecto}
              </h1>
              <p className="text-indigo-600 flex items-center gap-1 text-sm sm:text-base break-words">
                <Users size={16} className="inline" />
                {investigacion.autores}
              </p>
            </div>

            {/* Botón */}
            {archivoURL && (
              <button
                onClick={handleDescarga}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl text-sm md:text-lg font-medium transition-all shadow-md hover:shadow-lg whitespace-nowrap hover:scale-110"
              >
                <Download size={20} /> Descargar Documento
              </button>
            )}
          </div>
        </div>


        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Resumen y detalles */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Resumen de la Investigación</h3>
            <p className="text-gray-700 leading-relaxed mb-6">{investigacion.descripcion}</p>

            <div className="flex items-start gap-3">
              <CalendarDays size={20} className="text-indigo-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-800">Fecha de publicación</h4>
                <p className="text-gray-600">
                  {new Date(investigacion.fechaPublicacion).toLocaleString('es-CO', {
                    dateStyle: 'long',
                    timeStyle: 'short',
                    hour12: true,
                    timeZone: 'America/Bogota'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Fuente y enlaces */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <LinkIcon size={20} /> Fuentes
            </h3>

            {fuenteURL ? (
              <a
                href={fuenteURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                <LinkIcon size={18} />
                Ver fuente externa
              </a>
            ) : (
              <p className="text-gray-500 italic">No hay fuente disponible</p>
            )}

            {archivoURL && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <FileText size={18} /> Documentación adjunta
                </h4>
                <button
                  onClick={handleDescarga}
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                >
                  <Download size={16} />
                  Descargar archivo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestigacionDetalle;