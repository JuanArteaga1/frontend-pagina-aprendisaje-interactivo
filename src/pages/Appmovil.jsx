import React from "react";
import Navbar from "../components/Navbar";
import ListaProyectos from "../components/ListaProyectos";

const AplicacionesMoviles = () => {
    const aplicaciones = {
        "Fisica": ["App 1", "App 2"],
        "Matematicas": ["App 3", "App 4"],
        "Ingeniera Civil": []
    };

    return (
        <div>
            <Navbar />
            <ListaProyectos titulo="Aplicaciones Móviles" proyectos={aplicaciones} />
        </div>
    );
};

export default AplicacionesMoviles;

