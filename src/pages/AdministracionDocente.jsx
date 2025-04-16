import React, { useState } from "react";
import Navbar from "../components/Navbar";
import TablaDinamica from "../components/Tabla";
import MenuAdministrador from "../components/MenuAdmi_Doc";
import { Link } from 'react-router-dom';

const AdministrarDocente = () => {
  const [docentes, setDocentes] = useState([
    { 
      id: 1, 
      nombre: "Cristian Cañar", 
      especialidad: "Matemáticas",
      estado: "Activo",
      accion: "Editar"
    },
    { 
      id: 2, 
      nombre: "Ana María Caviedes", 
      especialidad: "Fisica",
      estado: "Inactivo",
      accion: "Editar"
    }
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  const docentesFiltrados = docentes.filter(docente => {
    const coincideBusqueda = docente.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                          docente.especialidad.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado ? docente.estado === filtroEstado : true;
    return coincideBusqueda && coincideEstado;
  });

  const handleActualizar = (docente) => {
    console.log('Actualizar:', docente);
  };

  const handleEliminar = (docente) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${docente.nombre}?`)) {
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
      <Navbar />
      
      <div className="flex flex-1 pt-16">
        <MenuAdministrador rol="admin" />
        
        <main className="flex-1 overflow-y-auto p-6 ml-64 max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Administrar Docentes</h1>
            <div className="mt-4 md:mt-0">
              <Link 
                to="/SubirDocente"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
              >
                + Nuevo Docente
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="busqueda" className="block text-sm font-medium text-gray-700">Buscar</label>
                <input
                  id="busqueda"
                  type="text"
                  placeholder="Nombre o especialidad..."
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
                <select 
                  id="estado"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <TablaDinamica
                datos={docentesFiltrados}
                columnas={[
                  { 
                    key: 'id', 
                    nombre: '#', 
                    className: 'w-16 text-center text-sm font-medium' 
                  },
                  { 
                    key: 'nombre', 
                    nombre: 'NOMBRE COMPLETO', 
                    className: 'text-sm font-medium' 
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
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
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
                    estilo: 'bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md'
                  },
                  { 
                    nombre: (docente) => docente.estado === "Activo" ? "Desactivar" : "Activar",
                    fn: handleCambiarEstado,
                    estilo: (docente) => 
                      `text-xs px-3 py-1 rounded-md ${docente.estado === "Activo" 
                        ? 'bg-yellow-500 hover:bg-yellow-600' 
                        : 'bg-green-500 hover:bg-green-600'} text-white`
                  },
                  { 
                    nombre: 'Eliminar', 
                    fn: handleEliminar,
                    estilo: 'bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md'
                  }
                ]}
              />
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-600">
              Mostrando <span className="font-medium">{docentesFiltrados.length}</span> de <span className="font-medium">{docentes.length}</span> docentes
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Anterior
              </button>
              <span className="text-sm text-gray-700">Página 1 de 1</span>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Siguiente
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdministrarDocente;