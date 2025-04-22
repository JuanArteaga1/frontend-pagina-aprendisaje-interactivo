import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MenuAdministrador = ({ rol }) => {
  const navigate = useNavigate();
  
  const opcionesMenu = {
    admin: [
      { nombre: "Inicio", ruta: "/", icono: "🏠" },
      { nombre: "Administrar docentes", ruta: "/AdministrarDocente", icono: "👨‍🏫" },
      { nombre: "Registrar docente", ruta: "/SubirDocente", icono: "➕" },
      { nombre: "Proyectos", ruta: "/VerProyectos", icono: "✅" },
      { nombre: "Aprobación de proyectos", ruta: "/Aprobar", icono: "📊" },
      { nombre: "Gestión de categorías", ruta: "/SubirCategoria", icono: "⚙" },
    ],
    docente: [
      { nombre: "Inicio", ruta: "/", icono: "🏠" },
      { nombre: "Subir proyectos", ruta: "/subir-proyecto", icono: "➕" },
      { nombre: "Investigaciones", ruta: "/SubirInvestigaciones", icono: "📝" },
      { nombre: "Podcasts", ruta: "/subir-podcast", icono: "🎙️" },
      { nombre: "Simulaciones", ruta: "/subirsimulaciones", icono: "🖥️" },
      { nombre: "Mis proyectos", ruta: "/misproyectos", icono: "📂" }
    ]
  };

  const opciones = opcionesMenu[rol] || opcionesMenu.docente;

  return (
    <div className="w-64 h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col border-r border-gray-700">
      {/* Encabezado mejorado */}
      <div className="p-5 border-b border-gray-700 bg-gray-900">
        <h2 className="text-xl font-bold text-white mb-1">
          {rol === 'admin' ? 'Panel Administrativo' : 'Panel Docente'}
        </h2>
        <p className="text-sm text-gray-300">
          {rol === 'admin' ? 'Administrador del sistema' : 'Área docente'}
        </p>
      </div>

      {/* Menú con mejor espaciado */}
      <nav className="flex-1 overflow-y-auto py-3">
        <ul className="space-y-2 px-3">
          {opciones.map((opcion, index) => (
            <li key={index}>
              <Link
                to={opcion.ruta}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:translate-x-1 group"
              >
                <span className="mr-3 text-xl group-hover:text-blue-400 transition-colors">
                  {opcion.icono}
                </span>
                <span className="font-medium">{opcion.nombre}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botón de cierre de sesión mejorado */}
      <div className="p-4 border-t border-gray-700 bg-gray-900">
        <button 
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-red-600 rounded-lg transition-all duration-200 flex items-center justify-center font-medium shadow-md hover:shadow-lg"
          onClick={() => navigate("/")}
        >
          <span className="mr-2 text-lg">🚪</span>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default MenuAdministrador;