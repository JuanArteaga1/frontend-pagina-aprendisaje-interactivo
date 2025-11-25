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
  MessageSquare,
} from "lucide-react";

/**
 * Componente de menú lateral (Sidebar) para los roles de Administrador y Docente.
 * Utiliza clases de Tailwind CSS para el estilo y la funcionalidad de colapso.
 *
 * @param {object} props
 * @param {'admin' | 'docente'} props.rol - El rol del usuario para determinar las opciones del menú.
 */
const MenuAdministrador = ({ rol }) => {
  const navigate = useNavigate();
  // Asume que useLogin proporciona la función signout
  const { signout } = useLogin();
  // Estado para controlar si el menú está colapsado (solo iconos)
  const [colapsado, setColapsado] = useState(false);

  /**
   * Muestra un SweetAlert2 para confirmar el cierre de sesión.
   * Si se confirma, llama a signout() y navega a la página de inicio.
   */
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

  /**
   * Opciones de menú definidas por rol.
   */
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
        nombre: "Gestión de Categorías",
        ruta: "/SubirCategoria",
        icono: <Settings className="w-6 h-6" />,
      },
      {
        nombre: "Gestión de Materias",
        ruta: "/SubirMateria",
        icono: <Settings className="w-6 h-6" />,
      },
      {
        nombre: "Lista de Categorías",
        ruta: "/categorias",
        icono: <Folder className="w-6 h-6" />,
      },
      {
        nombre: "Lista de Materias",
        ruta: "/materias",
        icono: <Folder className="w-6 h-6" />,
      },
      {
        nombre: "Proyectos",
        ruta: "/VerProyectos",
        icono: <FileText className="w-6 h-6" />,
      },
      {
        nombre: "Comentarios",
        ruta: "/comentarios",
        icono: <MessageSquare className="w-6 h-6" />,
      },
      {
        nombre: "Menú Docente", // Enlace al menú que vería un docente
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

  // Selecciona las opciones basadas en el rol, o usa las de docente como fallback
  const opciones = opcionesMenu[rol] || opcionesMenu.docente;

  return (
    // Contenedor principal: usa 'flex flex-col' para apilar elementos y 'h-full' para tomar toda la altura.
    <div
      className={`relative h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col border-r border-gray-700 transition-all duration-300
      ${colapsado ? "w-16" : "w-72"}`}
    >
      {/* Botón para colapsar/expandir */}
      <button
        onClick={() => setColapsado(!colapsado)}
        className="absolute -right-3 top-6 bg-gray-700 rounded-full p-1 shadow-md z-10 hover:bg-gray-600 transition"
      >
        {colapsado ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {/* Encabezado */}
      <div className="p-6 border-b border-gray-700 bg-gray-900 flex-shrink-0">
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

      {/* Menú de navegación: CLAVE para el desplazamiento */}
      {/* 'flex-1' toma el espacio restante. 'overflow-y-auto' permite el scroll SOLO en esta sección. */}
      <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
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
                  <span className="ml-4 font-medium text-lg whitespace-nowrap">
                    {opcion.nombre}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botón cerrar sesión: usa 'flex-shrink-0' para evitar que se comprima */}
      <div className="p-5 border-t border-gray-700 bg-gray-900 flex justify-center flex-shrink-0">
        <button
          onClick={handleCerrarSesion}
          className={`flex items-center justify-center gap-3 transition-all duration-200 
          ${colapsado ? "w-12 h-10" : "w-full py-3 px-10"} 
          bg-blue-600 hover:bg-red-600 rounded-lg font-semibold shadow-md hover:shadow-lg text-lg text-white`}
        >
          <LogOut className="w-6 h-6" />
          {!colapsado && <span>Cerrar sesión</span>}
        </button>
      </div>
      
      {/* Opcional: Estilos para ocultar la barra de scroll nativa en el nav y usar un scrollbar limpio */}
      <style>{`
        /* Oculta la barra de desplazamiento en el contenedor 'nav' en navegadores Webkit (Chrome, Safari) */
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }
        /* Oculta la barra de desplazamiento en Firefox */
        .custom-scrollbar {
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default MenuAdministrador;