import React from "react";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* Sección Izquierda: Logo */}
            <div className="nav-left">
                <Link to="/">
                    <img
                        src="/img/logo.png"
                        alt="Logo de Academia Ingeniería"
                        className="logo"
                    />
                </Link>
            </div>

            {/* Menú de Navegación-Contenedor azul con los enlaces */}
             <div className="nav-container">
                <ul className="nav-links">
                    <li><Link to="/simulaciones" className="hover-link">Simulaciones</Link></li>
                    <li><Link to="/appmovil" className="hover-link">Aplicaciones Móviles</Link></li>
                    <li><Link to="/investigaciones" className="hover-link">Investigaciones</Link></li>
                    <li><Link to="/podcast" className="hover-link">Podcast</Link></li>
                </ul>
            </div>

            {/* Sección Derecha: Iconos de búsqueda y usuario */}
            <div className="nav-icons">
                <button aria-label="Buscar" className="icon-button">
                    <Search className="icon" />
                </button>
                <Link to="/login" aria-label="Iniciar Sesión" className="icon-button">
                    <User className="icon" />
                </Link>
            </div>
        </nav>
    );
};


export default Navbar;
