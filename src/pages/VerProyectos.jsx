import React, { useEffect, useState } from "react";
import TablaDinamica from "../components/Tabla";
import { UseTraerProyectos } from "../context/TraerProyectos";
import MenuAdministrador from "../components/MenuAdmi_Doc";
import { Link } from "react-router-dom";

const MirarProyectos = () => {
  const { TraerProyectos, TraerProyectosT } = UseTraerProyectos();
  const [columnas, setColumnas] = useState([]);
  const [proyectosUnificados, setProyectosUnificados] = useState({ data: [] });

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
    TraerProyectosT(); // Llama al método para cargar los datos
  }, []);
  
  useEffect(() => {
    if (TraerProyectos?.data) {
      const {
        investigacion = [],
        podtcas = [],
        proyectos = [],
        simulaciones = []
      } = TraerProyectos.data; // 👈 Aquí está el fix
  
      const todos = [
        ...investigacion.map(p => ({ ...p, proyecto: "Investigación" })),
        ...podtcas.map(p => ({ ...p, proyecto: "Podcast" })),
        ...proyectos.map(p => ({ ...p, proyecto: "Proyecto" })),
        ...simulaciones.map(p => ({ ...p, proyecto: "Simulación" }))
      ];
  
      console.log("Todos los proyectos unificados:", todos);
      setProyectosUnificados({ data: todos });
    }
  }, [TraerProyectos]);

  const acciones = [
    {
      nombre: "Editar",
      fn: (fila) => {
        console.log("Editar:", fila);
      },
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menú Lateral */}
      <div className="fixed h-full w-64 bg-gray-800 text-white z-10">
        <MenuAdministrador rol="admin" />
      </div>

      <main className="flex-1 overflow-y-auto p-4 lg:p-8 ml-64">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Administrar Proyectos</h1>
          <div className="flex space-x-4">
            <Link
              to="/SubirDocente"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              + Nuevo Docente
            </Link>
          </div>
        </div>

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
