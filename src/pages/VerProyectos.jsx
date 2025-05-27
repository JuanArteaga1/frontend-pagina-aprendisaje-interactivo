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
import { FiSearch } from "react-icons/fi";

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

  useEffect(() => {
    TraerProyectosT();
  }, []);

  useEffect(() => {
    setColumnas([
      { key: "proyecto", nombre: "Tipo" },
      { key: "nombre_proyecto", nombre: "Nombre del Proyecto" },
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

      setTimeout(() => {
        setMensaje(null);
        navigate(location.pathname, { replace: true });
      }, 3000);
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
      estilo: "bg-yellow-500 text-white hover:bg-yellow-600"
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
      estilo: "bg-red-500 text-white hover:bg-red-600"
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="fixed h-full w-64 bg-gray-800 text-white z-10">
        <MenuAdministrador rol="admin" />
      </div>

      <main className="flex-1 overflow-y-auto p-4 lg:p-8 ml-64">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Administrar Proyectos
          </h1>
          <div className="flex space-x-4">
            <Link
              to="/SubirDocente"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              + Nuevo Docente
            </Link>
          </div>
        </div>

        {mensaje && (
          <div className={`mb-4 p-2 rounded ${tipoMensaje === "success"
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"}`}>
            {mensaje}
          </div>
        )}

        {/* Botón de búsqueda */}
        <div className="relative mb-4 flex justify-end">
          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className="text-gray-600 hover:text-black transition-transform duration-300 text-2xl"
          >
            <FiSearch />
          </button>
        </div>

        {/* Filtros con animación */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            mostrarFiltros ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
          }`}
        >
          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Buscar por nombre del proyecto..."
              className="p-2 border rounded w-full md:w-1/3"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
            />
            <input
              type="text"
              placeholder="Buscar por autor o código..."
              className="p-2 border rounded w-full md:w-1/3"
              value={filtroAutor}
              onChange={(e) => setFiltroAutor(e.target.value)}
            />
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="p-2 border rounded w-full md:w-1/3"
            >
              <option value="">Todos los tipos</option>
              <option value="Proyecto">Proyecto</option>
              <option value="Podcast">Podcast</option>
              <option value="Investigacion">Investigacion</option>
              <option value="Simulacion">Simulacion</option>
            </select>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
          <TablaDinamica
            datos={{ data: datosFiltrados }}
            columnas={columnas}
            acciones={acciones}
          />
        </div>
      </main>
    </div>
  );
};

export default MirarProyectos;
