import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MenuAdministrador = ({ rol }) => {
  const navigate = useNavigate();
  
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

  // Obtener opciones según el rol
  const opciones = opcionesMenu[rol] || opcionesMenu.docente;

  return (
    <div className="w-72 h-[calc(100vh-4rem)] bg-gray-800 text-white flex flex-col shadow-xl">
      {/* Encabezado ajustado */}
      <div className="p-4 border-b border-gray-700 bg-gray-900">
        <h2 className="text-xl font-bold">
          {rol === 'admin' ? 'Panel Administrativo' : 'Panel Docente'}
        </h2>
        <p className="text-sm text-gray-300">
          {rol === 'admin' ? 'Administrador' : 'Docente'}
        </p>
      </div>

      {/* Menú con scroll */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-2">
          {opciones.map((opcion, index) => (
            <li key={index}>
              <Link
                to={opcion.ruta}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <span className="mr-3 text-lg">{opcion.icono}</span>
                <span>{opcion.nombre}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botón de cierre de sesión */}
      <div className="p-3 border-t border-gray-700 bg-gray-900">
        <button 
          className="w-full py-2 bg-blue-600 rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center"
          onClick={() => navigate("/")}
        >
          <span className="mr-2">🚪</span>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default MenuAdministrador;