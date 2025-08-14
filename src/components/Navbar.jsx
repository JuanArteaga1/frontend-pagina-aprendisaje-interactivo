import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";
import Swal from 'sweetalert2';
import { useLogin } from "../context/LoginContext"


const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
    const { signin, Usuario, isAutheticated, errors: LoginErrors } = useLogin()


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
                <div className="flex justify-between h-20 items-center">
                    {/* Logo y menú principal */}
                    <div className="flex items-center hover:scale-110">
                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0">
                            <img
                                src="/img/logos autonoma_2.png"
                                alt="Logo de Academia Ingeniería"
                                className="h-12 md:h-14 w-auto transition-transform hover:scale-105"
                            />
                        </Link>

                        {/* Menú de navegación (desktop) */}
                        <div className="hidden md:ml-10 md:flex md:items-center md:space-x-8">
                            <Link
                                to="/simulaciones"
                                className="text-gray-700  hover:text-blue-600 px-3 py-2 rounded-md font-medium transition-colors duration-200 hover:scale-110"
                            >
                                Simulaciones
                            </Link>
                            <Link
                                to="/appmovil"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md  font-medium transition-colors duration-200 hover:scale-110"
                            >
                                Aplicaciones Móviles
                            </Link>
                            <Link
                                to="/investigaciones"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md  font-medium transition-colors duration-200 hover:scale-110"
                            >
                                Proyecto Investigación
                            </Link>
                            <Link
                                to="/podcast"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition-colors duration-200 hover:scale-110"
                            >
                                Podcast
                            </Link>
                        </div>
                    </div>

                    {/* Controles de usuario y búsqueda */}
                    <div className="flex items-center space-x-4">
                        {/* Barra de búsqueda mejorada */}
                        <div className="relative">
                            <div className={`flex items-center transition-all duration-300 ease-in-out ${mostrarBusqueda ? 'w-80' : 'w-10'}`}>
                                {/* Input de búsqueda */}
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && busqueda.trim() !== "") {
                                            window.location.href = `/resultados?query=${encodeURIComponent(busqueda.trim())}`;
                                        }
                                    }}
                                    className={`h-11 pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${mostrarBusqueda ? 'w-full opacity-100' : 'w-0 opacity-0'
                                        }`}
                                />

                                {/* Icono de búsqueda (siempre visible) */}
                                <button
                                    onClick={() => setMostrarBusqueda(!mostrarBusqueda)}
                                    className={`absolute left-0 h-11 w-10 flex items-center justify-center rounded-full ${mostrarBusqueda ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'
                                        } transition-colors duration-200`}
                                    aria-label="Buscar"
                                >
                                    <Search className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Menú usuario */}
                        <div className="relative ml-4">
                            <button
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                aria-label="Cuenta de usuario"
                            >
                                <User className="h-6 w-6" />
                            </button>

                            {isDropdownOpen && (
                                <div
                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className="py-1">
                                        {!isAutheticated ? (
                                            // No está logeado
                                            <Link
                                                to="/login"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Iniciar sesión
                                            </Link>
                                        ) : (
                                            <>
                                                {/* Usuario logeado - mostrar por rol */}
                                                {Usuario?.Rol === "Administrador" && (
                                                    <>
                                                        <Link
                                                            to="/menuadministrador"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            Menú Administrador
                                                        </Link>
                                                        <Link
                                                            to="/menudocente"
                                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            Menú Docente
                                                        </Link>
                                                    </>
                                                )}
                                                {Usuario?.Rol === "Docente" && (
                                                    <Link
                                                        to="/menudocente"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Menú Docente
                                                    </Link>
                                                )}

                                                {/* Cerrar sesión */}
                                                <button
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: '¿Cerrar sesión?',
                                                            text: '¿Estás segur@ de que quieres cerrar sesión?',
                                                            icon: 'warning',
                                                            showCancelButton: true,
                                                            confirmButtonColor: '#d33',
                                                            cancelButtonColor: '#3085d6',
                                                            confirmButtonText: 'Sí, cerrar sesión',
                                                            cancelButtonText: 'Cancelar'
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                localStorage.clear();
                                                                window.location.href = "/";
                                                            }
                                                        });
                                                    }}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Cerrar sesión
                                                </button>
                                            </>
                                        )}
                                        {/* Opción de ayuda (siempre disponible) */}
                                        <Link
                                            to="/ayuda"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Ayuda
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Botón hamburguesa (mobile) */}
                        <button
                            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Abrir menú"
                        >
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú móvil */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
                    <Link
                        to="/simulaciones"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:scale-110"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Simulaciones
                    </Link>
                    <Link
                        to="/appmovil"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 "
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Aplicaciones Móviles
                    </Link>
                    <Link
                        to="/investigaciones"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Investigaciones
                    </Link>
                    <Link
                        to="/podcast"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Podcast
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;