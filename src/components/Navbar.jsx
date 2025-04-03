import React from "react";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="bg-blue-800 shadow-md py-4 px-6 flex items-center justify-between">
            {/* Sección Izquierda: Logo */}
            <div className="flex items-center">
                <Link to="/">
                    <img
                        src="/img/logo.png"
                        alt="Logo de Academia Ingeniería"
                        className="h-12"
                    />
                </Link>
            </div>

            {/* Menú de Navegación (Movido más a la derecha) */}
            <div className="flex-grow flex justify-end pr-6">
                <ul className="flex space-x-6 text-lg font-semibold text-white">
                    <li><Link to="/" className="hover:text-gray-300 transition">Inicio</Link></li>
                    <li><Link to="/simulaciones" className="hover:text-gray-300 transition">Simulaciones</Link></li>
                    <li><Link to="/appmovil" className="hover:text-gray-300 transition">Aplicaciones Móviles</Link></li>
                    <li><Link to="/investigaciones" className="hover:text-gray-300 transition">Investigaciones</Link></li>
                    <li><Link to="/podcast" className="hover:text-gray-300 transition">Podcast</Link></li>
                </ul>
            </div>

            {/* Sección Derecha: Iconos */}
            <div className="flex items-center space-x-4">
                <button aria-label="Buscar" className="p-2 rounded-full hover:bg-blue-700 transition">
                    <Search className="h-6 w-6 text-white hover:text-gray-300" />
                </button>
                <Link to="/login" aria-label="Iniciar Sesión" className="p-2 rounded-full hover:bg-blue-700 transition">
                    <User className="h-6 w-6 text-white hover:text-gray-300" />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
