import React, { useState } from "react";
import Navbar from "../components/Navbar";
import TablaDinamica from "../components/Tabla";
import MenuAdministrador from "../components/MenuAdmi_Doc";

const MisProyectos = () => {
  // Datos de ejemplo
  const [proyectos, setProyectos] = useState([
    { id: 1, nombre: "Proyecto 1", descripcion: "Descripción del proyecto 1" },
    { id: 2, nombre: "Proyecto 2", descripcion: "Descripción del proyecto 2" },
    { id: 3, nombre: "Proyecto 3", descripcion: "Descripción del proyecto 3" }
  ]);

  // Función para actualizar un proyecto
  const handleActualizar = (proyecto) => {
    console.log("Actualizar:", proyecto);
    // Aquí implementa la lógica para actualizar el proyecto
    alert(`Actualizando: ${proyecto.nombre}`);
  };

  // Función para eliminar un proyecto
  const handleEliminar = (proyecto) => {
    if (window.confirm(`¿Eliminar el proyecto "${proyecto.nombre}"?`)) {
      setProyectos(proyectos.filter(p => p.id !== proyecto.id));
      alert(`Proyecto "${proyecto.nombre}" eliminado`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar Superior */}
      <Navbar />

      {/* Contenido Principal */}
      <div className="flex flex-1 pt-16">
        {/* Menú Lateral */}
        <MenuAdministrador rol="docente" />

        {/* Área de Contenido */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 ml-64">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Mis Proyectos
          </h1>

          {/* Contenedor de la Tabla */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <TablaDinamica
              datos={proyectos}
              columnas={[
                {
                  key: "id",
                  nombre: "#",
                  className: "w-12 text-center text-sm"
                },
                {
                  key: "nombre",
                  nombre: "NOMBRE PROYECTO",
                  className: "text-sm"
                },
                {
                  key: "descripcion",
                  nombre: "DESCRIPCIÓN",
                  className: "text-sm"
                }
              ]}
              acciones={[
                {
                  nombre: "Actualizar",
                  fn: handleActualizar,
                  estilo: "bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1"
                },
                {
                  nombre: "Eliminar",
                  fn: handleEliminar,
                  estilo: "bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1"
                }
              ]}
            />
          </div>

          {/* Pie de tabla */}
          <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
            <p>Mostrando {proyectos.length} proyectos</p>
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
    </div>
  );
};

export default MisProyectos;

