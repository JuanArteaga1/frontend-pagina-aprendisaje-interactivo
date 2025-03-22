import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <div className="nav-left">
                <Link to="/">
                    <img src="/img/logo.png" alt="Logo de Academia Ingeniería" className="h-10" style={{ height: "50px", width: "auto" }} />
                </Link>
                <ul className="nav-links">
                    <li><Link to="/simulaciones">Simulaciones</Link></li>
                    <li><Link to="/appmovil">Aplicaciones Móviles</Link></li>
                    <li><Link to="/investigaciones">Investigaciones</Link></li>
                    <li><Link to="/podcast">Podcast</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
