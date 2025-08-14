import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import Swal from 'sweetalert2';
import {
  Home,
  Upload,
  FilePlus,
  FileText,
  Mic,
  Monitor,
  Folder,
  LogOut,
  Users,
  UserPlus, 
  CheckCircle, 
  Settings, 
} from "lucide-react";

const MenuAdministrador = ({ rol }) => {
  const navigate = useNavigate();
  const { signout } = useLogin(); 
  
  const handleCerrarSesion = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "¿Estás segur@ de que quieres cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        signout();
        navigate('/');
      }
    });
  };
  
  const opcionesMenu = {
    admin: [
      { nombre: "Inicio", ruta: "/", icono: <Home className="w-6 h-6" /> },
      { nombre: "Administrar Usuarios", ruta: "/AdministrarDocente", icono: <Users className="w-6 h-6" /> },
      { nombre: "Registrar Usuario", ruta: "/SubirDocente", icono: <UserPlus className="w-6 h-6" /> },
      { nombre: "Proyectos", ruta: "/VerProyectos", icono: <FileText className="w-6 h-6" /> },
      { nombre: "Gestión de categorías", ruta: "/SubirCategoria", icono: <Settings className="w-6 h-6"/> },
      { nombre: "Menú Docente", ruta: "/menudocente", icono: <CheckCircle className="w-6 h-6" /> },
    ],
    docente: [
      { nombre: "Inicio", ruta: "/", icono: <Home className="w-6 h-6" />},
      { nombre: "Subir Aplicación", ruta: "/subir-proyecto", icono: <Upload className="w-6 h-6" /> },
      { nombre: "Subir Simulaciones", ruta: "/subirsimulaciones", icono: <Monitor className="w-6 h-6" />},
      { nombre: "Subir Investigación", ruta: "/SubirInvestigaciones", icono: <FileText className="w-6 h-6" /> },
      { nombre: "Subir Podcasts", ruta: "/subir-podcast", icono: <Mic className="w-6 h-6" />},
      { nombre: "Mis Proyectos", ruta: "/misproyectos", icono: <Folder className="w-6 h-6" /> }
    ]
  };

  const opciones = opcionesMenu[rol] || opcionesMenu.docente;

  return (
    <div className="w-72 h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col border-r border-gray-700">
      {/* Encabezado más grande */}
      <div className="p-6 border-b border-gray-700 bg-gray-900">
        <h2 className="text-2xl font-bold text-white mb-2">
          {rol === 'admin' ? 'Panel Administrativo' : 'Panel Docente'}
        </h2>
        <p className="text-base text-gray-300">
          {rol === 'admin' ? 'Administrador del sistema' : 'Área docente'}
        </p>
      </div>

      {/* Menú con más padding */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-3 px-4">
          {opciones.map((opcion, index) => (
            <li key={index}>
              <Link
                to={opcion.ruta}
                className="flex items-center p-4 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:translate-x-1 group"
              >
                <span className="mr-4 text-2xl group-hover:text-blue-400 transition-colors">
                  {opcion.icono}
                </span>
                <span className="font-medium text-lg">{opcion.nombre}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botón de cierre más grande */}
      <div className="p-5 border-t border-gray-700 bg-gray-900">
        <button 
          className="gap-3 w-full py-3 px-5 bg-blue-600 hover:bg-red-600 rounded-lg transition-all duration-200 flex items-center justify-center font-semibold shadow-md hover:shadow-lg text-lg"
          onClick={handleCerrarSesion}
        >
          <LogOut className="w-6 h-6 text-white" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default MenuAdministrador;
