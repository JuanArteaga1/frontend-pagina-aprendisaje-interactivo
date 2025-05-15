import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaDinamica from "../components/Tabla";
import MenuAdministrador from "../components/MenuAdmi_Doc";
import { useLogin } from "../context/LoginContext"
import { UseTraerProyectos } from "../context/TraerProyectos";


const MisProyectos = () => {
  const navigate = useNavigate();
  const { Usuario } = useLogin()
  const [columnas, setColumnas] = useState([]);
  const { traerProyectoId, TraerProyectosId } = UseTraerProyectos();
  const [proyectosUnificados, setProyectosUnificados] = useState({ data: [] });


  useEffect(() => {
    TraerProyectosId(Usuario.Id); // Llamada inicial para traer los datos
  }, []);


  useEffect(() => {
    setColumnas([
      { key: "proyecto", nombre: "Tipo" },
      { key: "nombre_proyecto", nombre: "Nombre del Proyecto" },
      { key: "autores", nombre: "Autores o Código" },
      { key: "fechaPublicacion", nombre: "Fecha de Publicación" }
    ]);
  }, []);
  // Opcional: Acciones
  const acciones = [
    {
      nombre: "Editar",
      fn: (fila) => {
        if (fila.proyecto === "Proyecto") {
          navigate(`/editar-proyecto/${fila._id}`, { state: { proyecto: fila } });
        } else if (fila.proyecto === "Podcast") {
          navigate(`/editar-podcast/${fila._id}`, { state: { podcast: fila } });
        } else if (fila.proyecto === "Investigación") {
          navigate(`/editar-investigacion/${fila._id}`, { state: { investigacion: fila } });
        } else if (fila.proyecto === "Simulación") {
          navigate(`/editar-simulacion/${fila._id}`, { state: { proyecto: fila } });
        }
      },
      mostrar: (fila) =>
        ["Proyecto", "Podcast", "Investigación", "Simulación"].includes(fila.proyecto),
      estilo: "bg-yellow-500 text-white hover:bg-yellow-600"
    },
    {
      nombre: "Eliminar",
      fn: (fila) => {
        console.log("Eliminar:", fila);
      },
      estilo: "bg-red-500 text-white hover:bg-red-600"
    }
  ];
  useEffect(() => {
    console.log("entro")
    console.log(traerProyectoId?.data)
    if (traerProyectoId?.data) {
      const {
        investigacion = [],
        podtcas = [],
        proyectos = [],
        simulaciones = []
      } = traerProyectoId.data;
      console.log("entro 2")
      const todos = [
        ...investigacion.map(p => ({ ...p, proyecto: "Investigación" })),
        ...podtcas.map(p => ({ ...p, proyecto: "Podcast" })),
        ...proyectos.map(p => ({ ...p, proyecto: "Proyecto" })),
        ...simulaciones.map(p => ({ ...p, proyecto: "Simulación" }))
      ];

      console.log(todos);
      setProyectosUnificados({ data: todos });

    }
  }, [traerProyectoId]);




  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menú Lateral */}
      <MenuAdministrador rol="docente" />

      {/* Área de Contenido */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Mis Proyectos
        </h1>

        {/* Contenedor de la Tabla */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <TablaDinamica
            datos={proyectosUnificados}
            columnas={columnas}
            acciones={acciones}
          />
        </div>

        {/* Pie de tabla */}
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
