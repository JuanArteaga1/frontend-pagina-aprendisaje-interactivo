import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useInvestigacion } from "../context/InvestigacionContext";

const Investigaciones = () => {
  const navigate = useNavigate();
  const { investigaciones, traerInvestigaciones } = useInvestigacion();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await traerInvestigaciones();
        setError(null);
      } catch (err) {
        console.error("Error al obtener investigaciones:", err);
        setError("No se pudieron cargar las investigaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Eliminé traerInvestigaciones de las dependencias

  const investigacionesOrdenadas = useMemo(() => {
    return [...(investigaciones || [])].sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha)
    );
  }, [investigaciones]);

  const investigacionesAgrupadas = useMemo(() => {
    return investigacionesOrdenadas.reduce((acc, inv) => {
      const materia = inv.materia?.nombre || "Sin materia";
      if (!acc[materia]) acc[materia] = [];
      acc[materia].push(inv);
      return acc;
    }, {});
  }, [investigacionesOrdenadas]);

  const conteoCategorias = useMemo(() => {
    return investigacionesOrdenadas.reduce((acc, inv) => {
      const materia = inv.materia?.nombre || "Sin materia";
      acc[materia] = (acc[materia] || 0) + 1;
      return acc;
    }, {});
  }, [investigacionesOrdenadas]);

  const categorias = Object.keys(conteoCategorias);

  const normalizePath = (path) => {
    return path?.replace(/\\/g, "/");
  };

  if (loading) {
    return (
      <div className="investigaciones-page">
        <Navbar />
        <div className="loading">Cargando investigaciones...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="investigaciones-page">
        <Navbar />
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="investigaciones-page bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex gap-6 p-6 max-w-7xl mx-auto">
        {/* Sidebar de categorías */}
        <aside className="w-64 bg-white p-4 rounded-lg shadow-sm border border-gray-200 sticky top-6 h-fit">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Categorías</h3>
          <ul className="space-y-2">
            {categorias.map((cat, index) => (
              <li
                key={index}
                onClick={() =>
                  setCategoriaSeleccionada(categoriaSeleccionada === cat ? null : cat)
                }
                className={`p-2 cursor-pointer rounded-md text-sm ${
                  categoriaSeleccionada === cat 
                    ? "bg-blue-100 text-blue-700 font-medium" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {`${cat} (${conteoCategorias[cat]})`}
              </li>
            ))}
          </ul>
        </aside>

        {/* Sección principal */}
        <main className="flex-1">
          {/* Barra de búsqueda */}
          <div className="mb-6 flex justify-between items-center">
            <input
              type="text"
              placeholder="Buscar investigación..."
              className="w-64 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Lista de investigaciones */}
          <div className="space-y-8">
            {Object.entries(investigacionesAgrupadas).map(([materia, items]) => (
              (categoriaSeleccionada === null || categoriaSeleccionada === materia) && (
                <div key={materia} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">{materia}</h2>
                  
                  {items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items
                        .filter((inv) =>
                          inv.nombre_proyecto.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((inv) => {
                          const rutaImagen = normalizePath(inv.urlimg) || "";
                          const urlImagen = rutaImagen
                            ? `http://localhost:3000/uploads/${rutaImagen.split("uploads/").pop()}`
                            : "img/placeholder.jpg";

                          const rutaPDF = normalizePath(inv.urlDoc) || "";
                          const urlPDF = rutaPDF
                            ? `http://localhost:3000/uploads/${rutaPDF.split("uploads/").pop()}`
                            : "#";

                          return (
                            <div key={inv._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                              <div className="h-48 overflow-hidden">
                                <img
                                  src={urlImagen}
                                  alt={inv.nombre_proyecto}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src = "img/placeholder.jpg";
                                  }}
                                />
                              </div>
                              <div className="p-4">
                                <h3 className="font-medium text-gray-900 mb-2">{inv.nombre_proyecto}</h3>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{inv.descripcion}</p>
                                <div className="flex justify-between items-center">
                                  <button
                                    onClick={() => navigate(`/investigaciones/${inv._id}`)}
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                  >
                                    Ver detalles
                                  </button>
                                  {rutaPDF && (
                                    <a 
                                      href={urlPDF} 
                                      download 
                                      className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
                                    >
                                      Descargar PDF
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No hay investigaciones disponibles en esta categoría.</p>
                  )}
                </div>
              )
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Investigaciones;