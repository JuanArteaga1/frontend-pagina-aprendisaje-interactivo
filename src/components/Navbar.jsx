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
        <nav className="bg-white shadow-md sticky top-0 z-50 mb-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24 relative">
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

                    {/* Menú principal */}
                    <div
                        className={`${
                            isMenuOpen ? "block" : "hidden md:flex"
                        } absolute md:static top-full md:top-auto left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:translate-x-0 bg-[#3356af] border-none rounded-xl md:rounded-full px-6 py-3 md:py-2 shadow-none transition-all duration-300 z-40`}
                    >
                        <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
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
                                        className="block text-white hover:text-blue-100 text-sm font-medium py-2 px-4 rounded transition-colors duration-200"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Botón hamburguesa */}
                    <button
                        className="text-4xl text-blue-600 md:hidden focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Abrir menú"
                    >
                        {isMenuOpen ? "✕" : "☰"}
                    </button>

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
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
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
