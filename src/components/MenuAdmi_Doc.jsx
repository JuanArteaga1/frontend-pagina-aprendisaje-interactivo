import React from "react";
import { Link } from "react-router-dom";

const MenuAdministrador= ({ rol }) => {
  // Definición de opciones por rol
  const opcionesMenu = {
    admin: [
      { nombre: "Administrar Docente", ruta: "/AdministrarDocente", icono: "👨‍🏫" },
      { nombre: "Subir Docente", ruta: "/SubirDocente", icono: "➕" },
      { nombre: "Mirar Proyectos", ruta: "/admin/aprobar", icono: "✅" },
      { nombre: "Proyectos por Aprovar", ruta: "/admin/reportes", icono: "📊" },
      { nombre: "Agregar Categoria", ruta: "/SubirCategoria", icono: "⚙️" }

    ],
    docente: [
      { nombre: "Subir Proyectos", ruta: "/docente/proyectos", icono: "➕" },
      { nombre: "Subir investigaciones", ruta: "/SubirInvestigaciones", icono: "📝" },
      { nombre: "Subir Podcast", ruta: "/docente/nuevo", icono: "➕" },
      { nombre: "Subir Simulacines", ruta: "/subirsimulaciones", icono: "📝" },
      { nombre: "Mis Proyectos", ruta: "/docente/perfil", icono: "📁" }
    ]
  };

  // Obtener opciones según el rol
  const opciones = opcionesMenu[rol] || opcionesMenu.docente;

  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed left-0 top-0 flex flex-col">
      {/* Encabezado */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">
          {rol === 'admin' ? 'Panel Administrativo' : 'Panel Docente'}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {rol === 'admin' ? 'Acceso completo' : 'Acceso docente'}
        </p>
      </div>

      {/* Menú */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-1">
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

      {/* Pie */}
      <div className="p-4 border-t border-gray-700 text-sm " >
        <p>Sesión: {rol === 'admin' ? 'Administrador' : 'Docente'}</p>
      </div>
      <div >
        <button className="p-4 bg-blue-400 py-1 rounded hover:bg-red-600 " onClick={() => navigate("/")} >Cerrar Sesion</button>
      </div>
    </div>
  );
};

export default MenuAdministrador;