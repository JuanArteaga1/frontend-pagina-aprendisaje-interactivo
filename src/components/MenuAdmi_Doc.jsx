import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MenuAdministrador = ({ rol }) => {
  const opcionesMenu = {
    admin: [
      { nombre: "Inicio", ruta: "/", icono: "🏠" },
      { nombre: "Administrar docente", ruta: "/AdministrarDocente", icono: "👨‍🏫" },
      { nombre: "Subir docente", ruta: "/SubirDocente", icono: "➕" },
      { nombre: "Mirar proyectos", ruta: "/VerProyectos", icono: "✅" },
      { nombre: "Proyectos por aprovar", ruta: "/Aprobar", icono: "📊" },
      { nombre: "Agregar categoria", ruta: "/SubirCategoria", icono: "⚙" },
    ],
    docente: [
      { nombre: "Inicio", ruta: "/", icono: "🏠" },
      { nombre: "Subir proyectos", ruta: "/subir-proyecto", icono: "➕" },
      { nombre: "Subir investigaciones", ruta: "/SubirInvestigaciones", icono: "📝" },
      { nombre: "Subir podcast", ruta: "/subir-podcast", icono: "➕" },
      { nombre: "Subir simulaciones", ruta: "/subirsimulaciones", icono: "📝" },
      { nombre: "Mis proyectos", ruta: "/misproyectos", icono: "📁" }
    ]
  };

  const opciones = opcionesMenu[rol] || opcionesMenu.docente;

  return (
    <div className="fixed left-0 top-[88px] w-64 h-[calc(100vh-88px)] bg-gray-800 text-white flex flex-col shadow-xl z-20 overflow-hidden">
      {/* Encabezado compacto */}
      <div className="p-3 border-b border-gray-700 bg-gray-900">
        <h2 className="text-lg font-bold truncate">
          {rol === 'admin' ? 'Panel Administrativo' : 'Panel Docente'}
        </h2>
        <p className="text-xs text-gray-300 truncate">
          {rol === 'admin' ? 'Administrador' : 'Docente'}
        </p>
      </div>

      {/* Menú scrollable */}
      <nav className="flex-1 overflow-y-auto py-1">
        <ul className="space-y-1 px-2">
          {opciones.map((opcion, index) => (
            <li key={index}>
              <Link
                to={opcion.ruta}
                className="flex items-center px-3 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm"
              >
                <span className="mr-2 text-base">{opcion.icono}</span>
                <span className="truncate">{opcion.nombre}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botón de cierre de sesión compacto */}
      <div className="p-2 border-t border-gray-700 bg-gray-900">
        <Link
          to="/"
          className="flex items-center justify-center w-full py-1.5 px-3 bg-blue-600 hover:bg-red-600 rounded-md text-sm font-medium transition-colors"
        >
          <span className="mr-1">🚪</span>
          Cerrar sesión
        </Link>
      </div>
    </div>
  );
};

export default MenuAdministrador;