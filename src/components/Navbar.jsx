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

            {/* Menú de Navegación */}
            <ul className="nav-links">
                <li><Link to="/simulaciones" className="hover-link">SIMULACIONES</Link></li>
                <li><Link to="/appmovil" className="hover-link">APP MOVILES</Link></li>
                <li><Link to="/investigaciones" className="hover-link">INVESTIGACION</Link></li>
                <li><Link to="/podcast" className="hover-link">PODCAST</Link></li>
            </ul>

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
