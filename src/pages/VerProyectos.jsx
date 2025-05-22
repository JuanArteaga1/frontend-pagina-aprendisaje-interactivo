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

  useEffect(() => {
    TraerProyectosT(); // Llamada inicial para traer los datos
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
      {/* Menú Lateral */}
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

        <TablaDinamica
          datos={proyectosUnificados}
          columnas={columnas}
          acciones={acciones}
        />
      </main>
    </div>
  );
};

export default MirarProyectos;
