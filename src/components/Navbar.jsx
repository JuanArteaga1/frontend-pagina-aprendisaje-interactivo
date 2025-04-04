import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    let timeoutId = null;

    const handleMouseEnter = () => {
        clearTimeout(timeoutId); // Evita que se cierre inmediatamente
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 300); // Pequeño retraso para estabilidad
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="nav-left">
                <Link to="/">
                    <img
                        src="/img/logo.png"
                        alt="Logo de Academia Ingeniería"
                        className="logo"
                    />
                </Link>
            </div>

            {/* Menú de Navegación */}
            <div className="nav-container">
                <ul className="nav-links">
                    <li><Link to="/" className="hover-link font-semibold">Inicio</Link></li>
                    <li><Link to="/simulaciones" className="hover-link font-semibold">Simulaciones</Link></li>
                    <li><Link to="/appmovil" className="hover-link font-semibold">Aplicaciones Móviles</Link></li>
                    <li><Link to="/investigaciones" className="hover-link font-semibold">Investigaciones</Link></li>
                    <li><Link to="/podcast" className="hover-link font-semibold">Podcast</Link></li>
                </ul>
            </div>

            {/* Iconos de búsqueda y usuario con Menú Desplegable */}
            <div className="nav-icons">
                <button aria-label="Buscar" className="icon-button">
                    <Search className="icon hover:text-blue-300" />
                </button>

                {/* Contenedor del menú desplegable */}
                <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <button aria-label="Iniciar Sesión" className="icon-button">
                        <User className="icon hover:text-blue-300" />
                    </button>
                        {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                        <ul className="py-2 text-gray-800">
                        <li><Link to="/login" className="block px-4 py-2 hover:bg-gray-200">Iniciar sesión</Link></li>
                        <li><Link to="/logout" className="block px-4 py-2 hover:bg-gray-200">Cerrar sesión</Link></li>
                        <li><Link to="/ayuda" className="block px-4 py-2 hover:bg-gray-200">Ayuda</Link></li>
                        </ul>
                    </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
