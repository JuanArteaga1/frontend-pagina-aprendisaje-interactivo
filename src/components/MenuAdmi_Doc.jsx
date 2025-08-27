import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import Swal from "sweetalert2";
import {
  Home,
  Upload,
  FileText,
  Mic,
  Monitor,
  Folder,
  LogOut,
  Users,
  UserPlus,
  CheckCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const MenuAdministrador = ({ rol }) => {
  const navigate = useNavigate();
  const { signout } = useLogin();
  const [colapsado, setColapsado] = useState(false);

  const handleCerrarSesion = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "¿Estás segur@ de que quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        signout();
        navigate("/");
      }
    });
  };

  const opcionesMenu = {
    admin: [
      { nombre: "Inicio", ruta: "/", icono: <Home className="w-6 h-6" /> },
      {
        nombre: "Administrar Usuarios",
        ruta: "/AdministrarDocente",
        icono: <Users className="w-6 h-6" />,
      },
      {
        nombre: "Registrar Usuario",
        ruta: "/SubirDocente",
        icono: <UserPlus className="w-6 h-6" />,
      },
      {
        nombre: "Gestión de categorías",
        ruta: "/SubirCategoria",
        icono: <Settings className="w-6 h-6" />,
      },
      {
        nombre: "Gestión de materias",
        ruta: "/SubirMateria",
        icono: <Settings className="w-6 h-6" />,
      },
      {
        nombre: "Lista de categorías",
        ruta: "/categorias", // nueva página CRUD
        icono: <Folder className="w-6 h-6" />,
      },
      {
        nombre: "Lista de materias",
        ruta: "/materias",
        icono: <Folder className="w-6 h-6" />,
      },
      {
        nombre: "Proyectos",
        ruta: "/VerProyectos",
        icono: <FileText className="w-6 h-6" />,
      },
      {
        nombre: "Menú Docente",
        ruta: "/menudocente",
        icono: <CheckCircle className="w-6 h-6" />,
      },
    ],
    docente: [
      { nombre: "Inicio", ruta: "/", icono: <Home className="w-6 h-6" /> },
      {
        nombre: "Subir Aplicación",
        ruta: "/subir-proyecto",
        icono: <Upload className="w-6 h-6" />,
      },
      {
        nombre: "Subir Simulaciones",
        ruta: "/subirsimulaciones",
        icono: <Monitor className="w-6 h-6" />,
      },
      {
        nombre: "Subir Investigación",
        ruta: "/SubirInvestigaciones",
        icono: <FileText className="w-6 h-6" />,
      },
      {
        nombre: "Subir Podcasts",
        ruta: "/subir-podcast",
        icono: <Mic className="w-6 h-6" />,
      },
      {
        nombre: "Mis Proyectos",
        ruta: "/misproyectos",
        icono: <Folder className="w-6 h-6" />,
      },
    ],
  };

  const opciones = opcionesMenu[rol] || opcionesMenu.docente;

  return (
    <div
      className={`relative h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col border-r border-gray-700 transition-all duration-300
      ${colapsado ? "w-16" : "w-72"}`}
    >
      {/* Botón para colapsar/expandir */}
      <button
        onClick={() => setColapsado(!colapsado)}
        className="absolute -right-3 top-6 bg-gray-700 rounded-full p-1 shadow-md"
      >
        {colapsado ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Encabezado */}
      <div className="p-6 border-b border-gray-700 bg-gray-900">
        {!colapsado && (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">
              {rol === "admin" ? "Panel Administrativo" : "Panel Docente"}
            </h2>
            <p className="text-base text-gray-300">
              {rol === "admin" ? "Administrador del sistema" : "Área docente"}
            </p>
          </>
        )}
      </div>

      {/* Menú */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-3 px-2">
          {opciones.map((opcion, index) => (
            <li key={index}>
              <Link
                to={opcion.ruta}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all duration-200 group"
              >
                <span className="text-2xl group-hover:text-blue-400 transition-colors">
                  {opcion.icono}
                </span>
                {!colapsado && (
                  <span className="ml-4 font-medium text-lg">
                    {opcion.nombre}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botón cerrar sesión */}
      <div className="p-5 border-t border-gray-700 bg-gray-900 flex justify-center">
        <button
          onClick={handleCerrarSesion}
          className={`flex items-center justify-center gap-3 transition-all duration-200 
      ${colapsado ? "w-12 h-10" : "w-full py-3 px-10"} 
      bg-blue-600 hover:bg-red-600 rounded-lg font-semibold shadow-md hover:shadow-lg text-lg`}
        >
          <LogOut className="w-6 h-6 text-white" />
          {!colapsado && <span>Cerrar sesión</span>}
        </button>
      </div>

    </div>
  );
};

export default MenuAdministrador;
