import React from "react";
import Navbar from "../components/Navbar";
import ListaProyectos from "../components/ListaProyectos";

const Simulaciones = () => {
    const proyectos = {
        Fisica: ["Simulación 1", "Simulación 2"],
        Matemáticas: ["Simulación A", "Simulación B"],
        "Ingeniería Civil": [] // Categoría vacía
    };

    return (
        <div className="simulaciones">
            <Navbar /> {/* Aquí se coloca la barra de navegación */}
            <h1 className="titulo-seccion">Simulaciones</h1>
            <div className="imagen-seccion">
                <img src="img/simulacionesportada.png" alt="Imagen de simulaciones" />
            </div>
            <ListaProyectos proyectos={proyectos} />
        </div>
    );
};

export default Simulaciones;
