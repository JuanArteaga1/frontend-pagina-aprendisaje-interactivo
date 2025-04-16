import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TablaDinamica from "../components/Tabla";
import MenuAdministrador from "../components/MenuAdmi_Doc";

const MisProyectos = () => {
  const navigate = useNavigate();
  
  // Datos de ejemplo
  const [proyectos, setProyectos] = useState([
    { id: 1, nombre: "Proyecto 1", descripcion: "Descripción del proyecto 1" },
    { id: 2, nombre: "Proyecto 2", descripcion: "Descripción del proyecto 2" },
    { id: 3, nombre: "Proyecto 3", descripcion: "Descripción del proyecto 3" }
  ]);

  // Función para actualizar un proyecto
  const handleActualizar = () => {
    navigate(`/actualizar-proyectos`);
  };

  // Función para eliminar un proyecto
  const handleEliminar = (proyecto) => {
    if (window.confirm(`¿Eliminar el proyecto "${proyecto.nombre}"?`)) {
      setProyectos(proyectos.filter(p => p.id !== proyecto.id));
      alert(`Proyecto "${proyecto.nombre}" eliminado`);
    }
  };

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
  );
};

export default MisProyectos;
