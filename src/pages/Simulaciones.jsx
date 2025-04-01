import React from "react";
import Navbar from "../components/Navbar";
import ListaProyectos from "../components/ListaProyectos";

const Simulaciones = () => {
    const simulaciones = {
        Fisica: ["Simulación A", "Simulación B", "Simulación C"],
        Matematica: ["Simulación D", "Simulación E", "Simulación F"],
        "Ingeniería Civil": []
    };

    return (
        <div>
            <Navbar />
            <ListaProyectos titulo="Simulaciones" proyectos={simulaciones} />
        </div>
    );
};

export default Simulaciones;
