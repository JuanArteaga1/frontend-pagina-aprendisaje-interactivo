import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UseTraerProyectos } from "../context/TraerProyectos";
import { useInvestigacion } from "../context/InvestigacionContext";


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
      <div className="p-5 max-w-6xl mx-auto">
        <h2 className="text-xl font-bold">Cargando investigación...</h2>
      </div>
    </>
  );
}


  if (!investigacion) {
    return (
      <>
        <Navbar />
        <div className="p-5 max-w-6xl mx-auto">
          <h2 className="text-xl font-bold">Investigación no encontrada</h2>
        </div>
      </>
    );
  }

  // Construcción de URLs si es necesario
  const archivoURL = investigacion.archivo?.replace(/\\/g, "/");
  const fuenteURL = investigacion.urlArticulo;
  const imagenURL = investigacion.urlimg
    ? `http://localhost:3000/uploads/${investigacion.urlimg.replace(/\\/g, "/").split("uploads/").pop()}`
    : "img/placeholder.jpg";
  const docURL = investigacion.urlDoc
    ? `http://localhost:3000/uploads/${investigacion.urlDoc.replace(/\\/g, "/").split("uploads/").pop()}`
    : null;


  return (
    <>
      <Navbar />
      <div className="p-5 max-w-6xl mx-auto">
        <div className="flex flex-col gap-8">

          {/* Título y autores */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-md flex justify-between items-center">
            <div className="w-36 h-36">
              <img src={imagenURL} alt={`Foto de ${investigacion.nombre_proyecto}`} className="w-full h-full object-cover rounded-lg" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{investigacion.nombre_proyecto}</h1>
              <p className="text-sm text-gray-600">{investigacion.autores}</p>
            </div>



            {/* {investigacion.archivo && ( */}

            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = archivoURL;
                link.download = investigacion.nombre_proyecto + ".pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500"
            >
              Descargar
            </button>
            {/* )} */}

          </div>

          {/* Descripción y datos */}
          <div className="bg-gray-50 p-5 rounded-lg shadow-md">
            <div className="flex justify-between gap-10">
              <div className="w-2/3">
                <h3 className="text-lg font-semibold mb-2">Resumen:</h3>
                <p className="text-base">{investigacion.descripcion}</p>
                <p className="mt-2 text-sm text-gray-700"><strong>Fecha de publicación:</strong> {investigacion.fechaPublicacion}</p>
              </div>
              <div className="w-1/3">
                <h3 className="text-lg font-semibold mb-2">Fuente:</h3>
                {fuenteURL ? (
                  <a
                    href={fuenteURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:underline text-sm"
                  >
                    🔗 Ver fuente externa
                  </a>
                ) : (
                  <p className="text-base mb-2">No hay fuente disponible.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestigacionDetalle;

