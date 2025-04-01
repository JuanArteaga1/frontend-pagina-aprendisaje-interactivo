import React, { useState } from "react";
import Navbar from "../components/Navbar";
import TablaDinamica from "../components/Tabla";
import MenuAdministrador from "../components/MenuAdmi_Doc";
import { Link } from 'react-router-dom';

const AdministrarDocente= () => {
// Datos de ejemplo para docentes
  const [docentes, setDocentes] = useState([
    { 
      id: 1, 
      nombre: "Juan Pérez", 
      especialidad: "Matemáticas Avanzadas",
      estado: "Activo",
      accion: "Editar"
    },
    { 
      id: 2, 
      nombre: "María García", 
      especialidad: "Ciencias de la Computación",
      estado: "Inactivo",
      accion: "Editar"
    }
  ]);

  // Estados para filtros
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  // Filtrar docentes
  const docentesFiltrados = docentes.filter(docente => {
    const coincideBusqueda = docente.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                          docente.especialidad.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado ? docente.estado === filtroEstado : true;
    return coincideBusqueda && coincideEstado;
  });

  // Funciones de acciones
  const handleActualizar = (docente) => {
    console.log('Actualizar:', docente);
    // Lógica para abrir modal de edición
  };

  const handleEliminar = (docente) => {
    if (window.confirm('¿Estás seguro de eliminar a ${docente.nombre}?')) {
      setDocentes(docentes.filter(d => d.id !== docente.id));
    }
  };

  const handleCambiarEstado = (docente) => {
    setDocentes(docentes.map(d => 
      d.id === docente.id 
        ? { ...d, estado: d.estado === "Activo" ? "Inactivo" : "Activo" }
        : d
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar Superior */}
      <Navbar />
      
      {/* Contenido Principal */}
      <div className="flex flex-1 pt-16"> {/* Ajuste para el navbar fijo */}
        {/* Menú Lateral */}
        <MenuAdministrador rol="admin" />
        
        {/* Área de Contenido */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 ml-64"> {/* Ajuste para el menú lateral */}
          {/* Encabezado */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Administrar Docentes</h1>
            <div className="flex space-x-4">
              <Link 
                to="/admin/docentes/nuevo"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                + Nuevo Docente
              </Link>
            </div>
          </div>
          
          {/* Filtros */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="busqueda" className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
                <input
                  id="busqueda"
                  type="text"
                  placeholder="Nombre o especialidad..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select 
                  id="estado"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                >
                  <option value="">Todos los estados</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Tabla de Docentes */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <TablaDinamica
              datos={docentesFiltrados}
              columnas={[
                { 
                  key: 'id', 
                  nombre: '#', 
                  className: 'w-16 text-center text-sm' 
                },
                { 
                  key: 'nombre', 
                  nombre: 'NOMBRE COMPLETO', 
                  className: 'text-sm' 
                },
                { 
                  key: 'especialidad', 
                  nombre: 'ESPECIALIDAD', 
                  className: 'text-sm' 
                },
                { 
                  key: 'estado', 
                  nombre: 'ESTADO', 
                  className: 'w-24 text-center',
                  formateador: (estado) => (
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      estado === "Activo" 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {estado}
                    </span>
                  )
                }
              ]}
              acciones={[
                { 
                  nombre: 'Editar', 
                  fn: handleActualizar,
                  estilo: 'bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1'
                },
                { 
                  nombre: (docente) => docente.estado === "Activo" ? "Desactivar" : "Activar",
                  fn: handleCambiarEstado,
                  estilo: (docente) => 
                    `text-xs px-3 py-1 ${docente.estado === "Activo" 
                      ? 'bg-yellow-500 hover:bg-yellow-600' 
                      : 'bg-green-500 hover:bg-green-600'} text-white`
                },
                { 
                  nombre: 'Eliminar', 
                  fn: handleEliminar,
                  estilo: 'bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1'
                }
              ]}
            />
          </div>
          
          {/* Pie de tabla */}
          <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
            <p>Mostrando {docentesFiltrados.length} de {docentes.length} docentes</p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border rounded text-sm">Anterior</button>
              <span className="text-sm">Página 1 de 1</span>
              <button className="px-3 py-1 border rounded text-sm">Siguiente</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdministrarDocente;