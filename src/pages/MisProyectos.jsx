import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TablaDinamica from "../components/Tabla";
import MenuAdministrador from "../components/MenuAdmi_Doc";
import { useLogin } from "../context/LoginContext";
import { UseTraerProyectos } from "../context/TraerProyectos";
import Swal from 'sweetalert2';
import { useProyectos } from "../context/ProyectoContext"
import { usePodcast } from "../context/PodcastContext";
import { useInvestigacion } from "../context/InvestigacionContext";
import { UseSimulaciones } from "../context/SimulacionesContex";

const MisProyectos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Usuario } = useLogin();

  const [columnas, setColumnas] = useState([]);
  const [proyectosUnificados, setProyectosUnificados] = useState({ data: [] });
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState("success");

  const { traerProyectoId, TraerProyectosId } = UseTraerProyectos();
  const { EliminarProyectos } = useProyectos();
  const { EliminarPodcast } = usePodcast();
  const { EliminarInvestigacion } = useInvestigacion();
  const { EliminarSimulaciones } = UseSimulaciones();

  useEffect(() => {
    TraerProyectosId(Usuario.Id);
  }, [Usuario.Id]);

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

  useEffect(() => {
    setColumnas([
      { key: "proyecto", nombre: "Tipo" },
      { key: "nombre_proyecto", nombre: "Nombre del Proyecto" },
      { key: "autores", nombre: "Autores o Código" },
      { key: "fechaPublicacion", nombre: "Fecha de Publicación" }
    ]);
  }, []);

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

          await TraerProyectosId(Usuario.Id);

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
        ["Proyecto", "Podcast", "Investigación", "Simulación"].includes(fila.proyecto),
      estilo: "bg-red-500 text-white hover:bg-red-600"
    }
  ];

  useEffect(() => {
    if (traerProyectoId?.data) {
      const {
        investigacion = [],
        podtcas = [],
        proyectos = [],
        simulaciones = []
      } = traerProyectoId.data;

      const todos = [
        ...investigacion.map(p => ({ ...p, proyecto: "Investigacion" })),
        ...podtcas.map(p => ({ ...p, proyecto: "Podcast" })),
        ...proyectos.map(p => ({ ...p, proyecto: "Proyecto" })),
        ...simulaciones.map(p => ({ ...p, proyecto: "Simulacion" }))
      ];

      setProyectosUnificados({ data: todos });
    }
  }, [traerProyectoId]);

  return (
    <div className="flex h-screen bg-gray-100">
      <MenuAdministrador rol="docente" />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Mis Proyectos</h1>

        {mensaje && (
          <div className={`mb-4 p-2 rounded ${tipoMensaje === "success"
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"}`}>
            {mensaje}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <TablaDinamica
            datos={proyectosUnificados}
            columnas={columnas}
            acciones={acciones}
          />
        </div>

        <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
              Anterior
            </button>
            <span className="text-sm">Página 1 de 1</span>
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
              Siguiente
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MisProyectos;
