import React from "react";
import Navbar from "../components/Navbar";
import ListaProyectos from "../components/ListaProyectos";

const AplicacionesMoviles = () => {
    const proyectos = {
        categoria1: ["App 1", "App 2"],
        categoria2: ["App A", "App B"],
    };

    return (
        <div className="aplicaciones-moviles">
            <Navbar />
            <h1 className="titulo-seccion">Aplicaciones Móviles</h1>
            <div className="imagen-seccion">
                <img src="img/aplicacionesportada.png" alt="Imagen de aplicaciones móviles" />
            </div>
            <ListaProyectos proyectos={proyectos} />
        </div>
    );
};

export default AplicacionesMoviles;

