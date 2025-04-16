import React, { useState } from "react";
import TablaDinamica from "../components/Tabla";
import MenuAdministrador from "../components/MenuAdmi_Doc";
import { Link } from 'react-router-dom';

const MirarProyectos = () => {
  // Datos de ejemplo para proyectos
  const [proyectos, setProyectos] = useState([
    { 
      id: 1, 
      nombre: "Sistema de Gestión Escolar", 
      tipo: "Simulaciones",
      estado: "Aprobado",
      fecha: "2025-04-3",
      docente: "Cristian Cañar"
    },
    { 
      id: 2, 
      nombre: "App Móvil para Clínica", 
      tipo: "Aplicación Móvil",
      estado: "En Revisión",
      fecha: "2025-04-3",
      docente: "Ana María Caviedes"
    },
    { 
      id: 3, 
      nombre: "Plataforma de Podcast", 
      tipo: "Podcast",
      estado: "Pendiente",
      fecha: "2025-04-3",
      docente: "Valentina Urbano"
    },
    {
      id: 4, 
      nombre: "Plataforma de Investigaciones", 
      tipo: "Investigaciones",
      estado: "Pendiente",
      fecha: "2025-04-3",
      docente: "Kevin Ruiz"
    }
  ]);

  // Estados para filtros
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  // Filtrar proyectos
  const proyectosFiltrados = proyectos.filter(proyecto => {
    const coincideBusqueda = proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                          proyecto.docente.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado ? proyecto.estado === filtroEstado : true;
    const coincideTipo = filtroTipo ? proyecto.tipo === filtroTipo : true;
    return coincideBusqueda && coincideEstado && coincideTipo;
  });

  // Funciones de acciones
  const handleVerDetalles = (proyecto) => {
    console.log('Ver detalles:', proyecto);
    // Navegar a página de detalles
  };

  const handleDescargar = (proyecto) => {
    console.log('Descargar:', proyecto);
    // Lógica para descargar archivos
  };

  const handleCambiarEstado = (proyecto) => {
    const nuevosEstados = {
      "Pendiente": "En Revisión",
      "En Revisión": "Aprobado",
      "Aprobado": "Pendiente"
    };
    setProyectos(proyectos.map(p => 
      p.id === proyecto.id 
        ? { ...p, estado: nuevosEstados[p.estado] || p.estado }
        : p
    ));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menú Lateral */}
      <div className="w-64 bg-gray-800 text-white">
        <MenuAdministrador rol="admin" />
      </div>
      
      {/* Contenido Principal */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-8">
          {/* Encabezado */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Ver Proyectos</h1>
            <div className="flex space-x-4">
            </div>
          </div>
          
          {/* Filtros */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="busqueda" className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
                <input
                  id="busqueda"
                  type="text"
                  placeholder="Nombre o docente..."
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
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Revisión">En Revisión</option>
                  <option value="Aprobado">Aprobado</option>
                </select>
              </div>
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select 
                  id="tipo"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={filtroTipo}
                  onChange={(e) => setFiltroTipo(e.target.value)}
                >
                  <option value="">Todos los tipos</option>
                  <option value="Aplicación Web">Aplicación Web</option>
                  <option value="Aplicación Móvil">Aplicación Móvil</option>
                  <option value="Podcast">Podcast</option>
                  <option value="Investigación">Investigación</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Tabla de Proyectos */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <TablaDinamica
              datos={proyectosFiltrados}
              columnas={[
                { 
                  key: 'id', 
                  nombre: '#', 
                  className: 'w-12 text-center text-sm' 
                },
                { 
                  key: 'nombre', 
                  nombre: 'NOMBRE DEL PROYECTO', 
                  className: 'text-sm' 
                },
                { 
                  key: 'tipo', 
                  nombre: 'TIPO', 
                  className: 'text-sm' 
                },
                { 
                  key: 'docente', 
                  nombre: 'DOCENTE', 
                  className: 'text-sm' 
                },
                { 
                  key: 'fecha', 
                  nombre: 'FECHA', 
                  className: 'text-sm',
                  formateador: (fecha) => new Date(fecha).toLocaleDateString()
                },
                { 
                  key: 'estado', 
                  nombre: 'ESTADO', 
                  className: 'w-24 text-center',
                  formateador: (estado) => (
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      estado === "Aprobado" 
                        ? 'bg-green-100 text-green-800' 
                        : estado === "En Revisión"
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      {estado}
                    </span>
                  )
                }
              ]}
              acciones={[
                { 
                  nombre: 'Detalles', 
                  fn: handleVerDetalles,
                  estilo: 'bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1'
                },
                { 
                  nombre: (proyecto) => proyecto.estado === "Aprobado" ? "Revocar" : 
                                       proyecto.estado === "En Revisión" ? "Aprobar" : "Revisar",
                  fn: handleCambiarEstado,
                  estilo: (proyecto) => 
                    `text-xs px-3 py-1 ${
                      proyecto.estado === "Aprobado" 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : proyecto.estado === "En Revisión"
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-yellow-500 hover:bg-yellow-600'
                    } text-white`
                },
                { 
                  nombre: 'Descargar', 
                  fn: handleDescargar,
                  estilo: 'bg-purple-500 hover:bg-purple-600 text-white text-xs px-3 py-1'
                }
              ]}
            />
          </div>
          
          {/* Pie de tabla */}
          <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
            <p>Mostrando {proyectosFiltrados.length} de {proyectos.length} proyectos</p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">Anterior</button>
              <span className="text-sm">Página 1 de 1</span>
              <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">Siguiente</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MirarProyectos;