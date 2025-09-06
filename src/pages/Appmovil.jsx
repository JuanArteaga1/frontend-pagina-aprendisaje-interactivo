import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useProyectos } from "../context/ProyectoContext";

const AplicacionesMoviles = () => {
  const navigate = useNavigate();
  const { Proyectos, TraerProyectos } = useProyectos();
  const [seccionActual, setSeccionActual] = useState("Aplicaciones Moviles");
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_RUTA1;

  useEffect(() => {
    const cargarDatos = async () => {
      await TraerProyectos();
      setLoading(false);
    };
    cargarDatos();
  }, []);

  const proyectosOrdenados = useMemo(() => {
    return [...Proyectos].sort(
      (a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion)
    );
  }, [Proyectos]);

  const proyectosAgrupados = proyectosOrdenados.reduce((acc, proyecto) => {
    const categoria = proyecto.materia?.nombre || "Sin categoría";
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(proyecto);
    return acc;
  }, {});

  // Función para formatear autores
  const formatAutores = (autores) => {
    if (!autores) return "No especificado";

    try {
      if (typeof autores === "string" && autores.startsWith("[")) {
        const parsed = JSON.parse(autores);
        if (Array.isArray(parsed)) {
          return parsed.join(", ");
        }
      }

      if (Array.isArray(autores)) {
        return autores.join(", ");
      }

      if (typeof autores === "string") {
        return autores
          .replace(/[\[\]"']/g, "")
          .replace(/,\s*,/g, ",")
          .replace(/^\s*,|,\s*$/g, "")
          .trim();
      }
    } catch (error) {
      return String(autores)
        .replace(/[\[\]"']/g, "")
        .replace(/,\s*,/g, ",")
        .replace(/^\s*,|,\s*$/g, "")
        .trim() || "No especificado";
    }

    return "No especificado";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="min-h-screen flex flex-col justify-center items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-sm text-cyan-600">Cargando aplicaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aplicaciones-moviles">
      <Navbar />
      
      <div className="imagen-seccion">
        <img src="img/DSC04968.JPG" alt="" />
        <h1 className="titulo-seccion">Ahora estás en: {seccionActual}</h1>
      </div>

      <div className="contenido-proyectos">
        {Object.entries(proyectosAgrupados).map(([categoria, items]) => (
          <div key={categoria} className="categoria">
            <h2 className="text-3xl font-bold mt-6 ml-4 text-blue-900">
              {categoria}
            </h2>
            {items.length > 0 ? (
              <div className="flex flex-wrap gap-8 justify-start py-6">
                {items.map((app, i) => {
                  const rutaLimpia = app.urlimg?.replace(/\\/g, "/");
                  const imagenURL = `${apiUrl}/uploads/${rutaLimpia?.split("uploads/")[1]}`;

                  return (
                    <div 
                      key={i} 
                      className="w-96 h-[32rem] m-4 group cursor-pointer"
                      style={{ perspective: '1000px' }}
                    >
                      <div 
                        className="relative w-full h-full duration-700 group-hover:rotate-y-180"
                        style={{
                          transformStyle: 'preserve-3d',
                          transition: 'transform 0.7s'
                        }}
                      >
                        {/* Parte frontal */}
                        <div 
                          className="absolute inset-0 rounded-2xl shadow-xl overflow-hidden"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                          <img
                            src={imagenURL}
                            alt={app.nombre_proyecto}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Parte trasera */}
                        <div 
                          className="absolute inset-0 bg-blue-900 text-white p-7 flex flex-col rounded-2xl shadow-2xl"
                          style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                          }}
                        >
                          {/* Header */}
                          <div className="flex items-center mb-4">
                            <span className="text-yellow-400 text-3xl mr-2">💡</span>
                            <span className="text-yellow-400 font-bold uppercase text-base">
                              Proyecto Estudiantil
                            </span>
                          </div>
                          
                          {/* Título */}
                          <h3 className="text-3xl font-extrabold mb-4 leading-snug">
                            {app.nombre_proyecto}
                          </h3>
                          
                          {/* Descripción */}
                          <p className="text-lg leading-relaxed mb-5 opacity-95 line-clamp-4">
                            {app.descripcion || "Este proyecto busca fomentar la innovación tecnológica en el área de desarrollo..."}
                          </p>
                          
                          {/* Autores y Programa */}
                          <div className="mb-6 space-y-2 text-base">
                            <p>
                              <span className="font-semibold">Autores:</span>{" "}
                              {formatAutores(app.autores)}
                            </p>
                            <p>
                              <span className="font-semibold">Programa:</span>{" "}
                              {app.materia?.nombre || "Sin especificar"}
                            </p>
                          </div>
                          
                          {/* Botón */}
                          <button 
                            className="bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-md text-lg uppercase tracking-wide shadow-md hover:bg-yellow-500 transition-all duration-300 w-fit"
                            onClick={() => navigate(`/detalle/${app._id}`)}
                          >
                            Ver más
                          </button>
                          
                          {/* Footer */}
                          <div className="absolute bottom-6 right-6 text-right opacity-90">
                            <span className="text-base font-bold leading-tight tracking-wide">
                              Universidad<br/>
                              Autónoma<br/>
                              del Cauca
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ marginLeft: "10px" }}>No hay aplicaciones disponibles.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AplicacionesMoviles;
