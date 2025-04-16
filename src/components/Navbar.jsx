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
        <nav className="flex flex-wrap justify-between items-center p-4 md:p-6">
            {/* Logo */}
            <div className="flex-shrink-0 mr-4">
                <Link to="/">
                    <img
                        src="/img/logos autonoma_2.png"
                        alt="Logo de Academia Ingeniería"
                        className="h-12 md:h-[70px] w-auto"
                    />
                </Link>
            </div>

            {/* Botón hamburguesa */}
            <button
                className="text-3xl text-[#3C64C9] md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Abrir menú"
            >
                ☰
            </button>

            {/* Menú de navegación */}
            <div
                className={`${isMenuOpen ? "flex" : "hidden"
                    } flex-col md:flex md:flex-row bg-[#3C64C9] rounded-lg mt-4 md:mt-0 w-full md:w-auto px-6 py-4 md:px-40 md:py-5 items-center`}
            >
                <ul className="flex flex-col md:flex-row gap-5 md:gap-10 text-white font-medium text-[16px] capitalize w-full md:w-auto justify-center">
                    <li>
                        <Link
                            to="/"
                            className="hover:text-[#081e57]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/simulaciones"
                            className="hover:text-[#081e57]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Simulaciones
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/appmovil"
                            className="hover:text-[#081e57]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Aplicaciones Móviles
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/investigaciones"
                            className="hover:text-[#081e57]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Investigaciones
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/podcast"
                            className="hover:text-[#081e57]"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Podcast
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Iconos */}
            <div className="flex gap-6 mt-4 md:mt-0 ml-auto items-center">
                <button aria-label="Buscar" className="text-[#333] hover:text-blue-300">
                    <Search className="w-[30px] h-[30px]" />
                </button>

                <div
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <button
                        aria-label="Iniciar Sesión"
                        className="text-[#333] hover:text-blue-300"
                    >
                        <User className="w-[30px] h-[30px]" />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                            <ul className="py-2 text-gray-800">
                                <li>
                                    <Link
                                        to="/login"
                                        className="block px-4 py-2 hover:bg-gray-200"
                                    >
                                        Iniciar sesión
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/logout"
                                        className="block px-4 py-2 hover:bg-gray-200"
                                    >
                                        Cerrar sesión
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/ayuda"
                                        className="block px-4 py-2 hover:bg-gray-200"
                                    >
                                        Ayuda
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
