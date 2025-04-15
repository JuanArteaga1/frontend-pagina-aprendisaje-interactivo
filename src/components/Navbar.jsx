import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let timeoutId = null;

    const handleMouseEnter = () => {
        clearTimeout(timeoutId);
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 300);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img
                                src="/img/logos autonoma_2.png"
                                alt="Logo de Academia Ingeniería"
                                className="h-16 md:h-20 w-auto transition-transform duration-300 hover:scale-105"
                            />
                        </Link>
                    </div>

                    {/* Botón hamburguesa */}
                    <button
                        className="text-4xl text-blue-600 md:hidden focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Abrir menú"
                    >
                        {isMenuOpen ? "✕" : "☰"}
                    </button>

                    {/* Menú de navegación */}
                    <div className={`${isMenuOpen ? "block" : "hidden"} md:block absolute md:relative top-20 md:top-0 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent z-40`}>
                        <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0">
                            {[
                                { to: "/", name: "Inicio" },
                                { to: "/simulaciones", name: "Simulaciones" },
                                { to: "/appmovil", name: "Aplicaciones Móviles" },
                                { to: "/investigaciones", name: "Investigaciones" },
                                { to: "/podcast", name: "Podcast" }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.to}
                                        className="block text-white md:text-gray-800 hover:text-blue-100 md:hover:text-blue-600 text-lg font-medium py-2 px-4 rounded transition-colors duration-200"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Iconos */}
                    <div className="flex items-center space-x-6 ml-4">
                        <button 
                            aria-label="Buscar" 
                            className="text-gray-700 hover:text-blue-600 p-2 rounded-full transition-colors duration-200"
                        >
                            <Search className="w-7 h-7" />
                        </button>

                        <div 
                            className="relative"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                aria-label="Cuenta de usuario"
                                className="text-gray-700 hover:text-blue-600 p-2 rounded-full transition-colors duration-200"
                            >
                                <User className="w-7 h-7" />
                            </button>
                            
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 transform transition-all duration-200 ease-out">
                                    <ul className="py-1">
                                        {[
                                            { to: "/login", name: "Iniciar sesión" },
                                            { to: "/logout", name: "Cerrar sesión" },
                                            { to: "/ayuda", name: "Ayuda" }
                                        ].map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    to={item.to}
                                                    className="block px-4 py-3 text-gray-800 hover:bg-gray-100 text-base transition-colors duration-150"
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
