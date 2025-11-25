import React, { useEffect, useState } from "react";
import TablaDinamica from "../components/Tabla";
import { UseTraerProyectos } from "../context/TraerProyectos";
import MenuAdministrador from "../components/MenuAdmi_Doc";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useProyectos } from "../context/ProyectoContext";
import { usePodcast } from "../context/PodcastContext";
import { useInvestigacion } from "../context/InvestigacionContext";
import { UseSimulaciones } from "../context/SimulacionesContex";
import Swal from "sweetalert2";
// Importar iconos de Lucide (modernos)
import { Search, Edit, Trash2, BarChart2, Users, FileText } from "lucide-react"; 

// --- Componente auxiliar para las tarjetas de estadísticas ---
// Lo incluimos aquí ya que es parte del renderizado del componente principal.
const StatsCard = ({ title, value, icon, color }) => (
  <div className={`p-5 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-[1.03] border-b-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div className="text-left">
        <p className="text-sm font-medium text-gray-100 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color.replace('-500', '-600')}`}>
        {icon}
      </div>
    </div>
  </div>
);

// ------------------------------------------------------------------

const MirarProyectos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { TraerProyectos, TraerProyectosT } = UseTraerProyectos();
  const { EliminarProyectos } = useProyectos();
  const { EliminarPodcast } = usePodcast();
  const { EliminarInvestigacion } = useInvestigacion();
  const { EliminarSimulaciones } = UseSimulaciones();

  const [columnas, setColumnas] = useState([]);
  const [proyectosUnificados, setProyectosUnificados] = useState({ data: [] });
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState("success");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroAutor, setFiltroAutor] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  // --- Lógica de Contextos y Efectos ---

  useEffect(() => {
    TraerProyectosT();
  }, []);

  useEffect(() => {
    setColumnas([
      { key: "proyecto", nombre: "Tipo" },
      { key: "nombre_proyecto", nombre: "Nombre del Recurso" },
      { key: "autores", nombre: "Autores o Código" },
      { key: "fechaPublicacion", nombre: "Fecha de Publicación" }
    ]);
  }, []);

  useEffect(() => {
    if (TraerProyectos?.data) {
      const {
        investigacion = [],
        podtcas = [],
        proyectos = [],
        simulaciones = []
      } = TraerProyectos.data;

      const todos = [
        ...investigacion.map(p => ({ ...p, proyecto: "Investigacion" })),
        ...podtcas.map(p => ({ ...p, proyecto: "Podcast" })),
        ...proyectos.map(p => ({ ...p, proyecto: "Proyecto" })),
        ...simulaciones.map(p => ({ ...p, proyecto: "Simulacion" }))
      ];

      setProyectosUnificados({ data: todos });
    }
  }, [TraerProyectos]);

  useEffect(() => {
    if (location.state?.mensaje) {
      setMensaje(location.state.mensaje);
      setTipoMensaje(location.state.tipo || "success");

      const timer = setTimeout(() => {
        setMensaje(null);
        navigate(location.pathname, { replace: true });
      }, 3000);
      
      return () => clearTimeout(timer); // Limpieza del timer
    }
  }, [location.state, navigate, location.pathname]);

  const datosFiltrados = proyectosUnificados.data.filter(p => {
    const nombre = p.nombre_proyecto?.toLowerCase() || "";
    const autores = Array.isArray(p.autores)
      ? p.autores.join(", ").toLowerCase()
      : (p.autores?.toLowerCase?.() || "");
    return (
      nombre.includes(filtroNombre.toLowerCase()) &&
      autores.includes(filtroAutor.toLowerCase()) &&
      (filtroTipo === "" || p.proyecto === filtroTipo)
    );
  });
  
  const obtenerConteoTipos = () => {
    return proyectosUnificados.data.reduce((acc, p) => {
      acc[p.proyecto] = (acc[p.proyecto] || 0) + 1;
      return acc;
    }, {
      Proyecto: 0,
      Podcast: 0,
      Investigacion: 0,
      Simulacion: 0,
      Total: proyectosUnificados.data.length
    });
  };

  const conteos = obtenerConteoTipos();
  
  // --- Acciones de la Tabla (Colores: Amarillo y Rojo) ---
  const acciones = [
    {
      nombre: "Editar",
      fn: (fila) => {
        const rutas = {
          "Proyecto": "/editar-proyecto",
          "Podcast": "/editar-podcast",
          "Investigacion": "/editar-investigacion",
          "Simulacion": "/editar-simulacion"
        };
        const ruta = rutas[fila.proyecto];
        if (ruta) {
          navigate(`${ruta}/${fila._id}`, { state: { [fila.proyecto.toLowerCase()]: fila } });
        }
      },
      mostrar: (fila) =>
        ["Proyecto", "Podcast", "Investigacion", "Simulacion"].includes(fila.proyecto),
      estilo: "bg-yellow-500 text-white hover:bg-yellow-600 p-2 rounded-full shadow-md transition-all duration-200", 
      icono: <Edit size={16} /> 
    },
    {
      nombre: "Eliminar",
      fn: async (fila) => {
        const { isConfirmed } = await Swal.fire({
          title: "¿Estás seguro?",
          text: `Esto eliminará permanentemente el ${fila.proyecto.toLowerCase()}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar"
        });

        if (!isConfirmed) return;

        try {
          if (fila.proyecto === "Proyecto") {
            await EliminarProyectos(fila._id);
          } else if (fila.proyecto === "Podcast") {
            await EliminarPodcast(fila._id);
          } else if (fila.proyecto === "Investigacion") {
            await EliminarInvestigacion(fila._id);
          } else if (fila.proyecto === "Simulacion") {
            await EliminarSimulaciones(fila._id);
          }

          await TraerProyectosT();

          Swal.fire(
            '¡Eliminado!',
            `El ${fila.proyecto.toLowerCase()} fue eliminado correctamente.`,
            'success'
          );
        } catch (error) {
          console.error(error);
          Swal.fire(
            'Error',
            `Hubo un problema al eliminar el ${fila.proyecto.toLowerCase()}.`,
            'error'
          );
        }
      },
      mostrar: (fila) =>
        ["Proyecto", "Podcast", "Investigacion", "Simulacion"].includes(fila.proyecto),
      estilo: "bg-red-600 text-white hover:bg-red-700 p-2 rounded-full shadow-md transition-all duration-200", 
      icono: <Trash2 size={16} /> 
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar: asume que MenuAdministrador maneja el ancho fijo y la posición (e.g., fixed/sticky) */}
      <MenuAdministrador rol="admin" /> 

      {/* MAIN: Eliminamos el ml-64 para permitir el centrado horizontal */}
      <main className="flex-1 overflow-y-auto p-4 md:p-10 lg:p-8"> 
        
        {/* CONTENIDO CENTRADO: max-w-6xl limita el ancho y mx-auto lo centra */}
        <div className="max-w-6xl mx-auto"> 
          
          {/* Encabezado y Botón de Acción */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4 md:mb-0 tracking-tight">
              Administración de Proyectos
            </h1>
            <div className="flex space-x-3">
              <Link
                to="/SubirDocente"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <Users size={20} className="mr-2" />
                + Nuevo Docente
              </Link>
            </div>
          </div>

          {/* Notificación Toast */}
          {mensaje && (
            <div className={`mb-6 p-4 rounded-xl shadow-lg border ${tipoMensaje === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"}`}>
              <p className="font-medium">{mensaje}</p>
            </div>
          )}

          {/* 📊 Dashboard (Estadísticas Rápidas) */}
          <div className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatsCard title="Total Recursos" value={conteos.Total} icon={<BarChart2 className="w-6 h-6 text-white" />} color="bg-indigo-500" />
            <StatsCard title="Investigaciones" value={conteos.Investigacion} icon={<FileText className="w-6 h-6 text-white" />} color="bg-teal-500" />
            <StatsCard title="Proyectos" value={conteos.Proyecto} icon={<FileText className="w-6 h-6 text-white" />} color="bg-blue-500" />
            <StatsCard title="Simulaciones" value={conteos.Simulacion} icon={<FileText className="w-6 h-6 text-white" />} color="bg-purple-500" />
          </div>

          {/* Controles de Búsqueda y Filtrado */}
          <div className="bg-white p-5 rounded-xl shadow-lg mb-8">
              <div className="flex justify-end">
                  <button
                      onClick={() => setMostrarFiltros(!mostrarFiltros)}
                      className="flex items-center p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 border rounded-full hover:shadow-md"
                      aria-expanded={mostrarFiltros}
                      aria-controls="filter-panel"
                  >
                      <Search size={20} className="mr-2" />
                      {mostrarFiltros ? 'Ocultar Filtros' : 'Buscar y Filtrar'}
                  </button>
              </div>

              {/* Panel de Filtros con Animación */}
              <div
                  id="filter-panel"
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      mostrarFiltros ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
              >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t mt-4">
                      <input
                          type="text"
                          placeholder="Buscar por nombre del recurso..."
                          className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                          value={filtroNombre}
                          onChange={(e) => setFiltroNombre(e.target.value)}
                      />
                      <input
                          type="text"
                          placeholder="Buscar por autor o código..."
                          className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                          value={filtroAutor}
                          onChange={(e) => setFiltroAutor(e.target.value)}
                      />
                      <select
                          value={filtroTipo}
                          onChange={(e) => setFiltroTipo(e.target.value)}
                          className="p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                      >
                          <option value="">Todos los Tipos de Recurso</option>
                          <option value="Proyecto">Proyecto</option>
                          <option value="Podcast">Podcast</option>
                          <option value="Investigacion">Investigación</option>
                          <option value="Simulacion">Simulación</option>
                      </select>
                  </div>
              </div>
          </div>

          {/* Tabla Dinámica */}
          <div className="mt-6 bg-white rounded-xl shadow-2xl overflow-x-auto">
            {datosFiltrados.length > 0 ? (
              <TablaDinamica
                datos={{ data: datosFiltrados }}
                columnas={columnas}
                acciones={acciones}
              />
            ) : (
              <div className="p-10 text-center text-gray-500">
                  <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No se encontraron recursos que coincidan con los filtros.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MirarProyectos;