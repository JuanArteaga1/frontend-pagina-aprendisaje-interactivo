import React from "react";
import Navbar from "../components/Navbar";
import CategoriaProyectos from "../components/CategoriaProyectos";

const simulaciones = {
    Fisica: ["Simulación A", "Simulación B", "Simulación C"]
};

const aplicaciones = {
    Fisica: ["App 1", "App 2"]
};

const Fisica = () => {
    return (
        <div>
            <Navbar />
            {/* Sección de Simulaciones */}
            <CategoriaProyectos titulo="Simulaciones de Física" categoria="Fisica" proyectos={simulaciones} />

            {/* Sección de Aplicaciones Móviles */}
            <CategoriaProyectos titulo="Aplicaciones Móviles de Física" categoria="Fisica" proyectos={aplicaciones} />
        </div>
    );
};

export default Fisica;

