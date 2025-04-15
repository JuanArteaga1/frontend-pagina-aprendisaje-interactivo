import React from "react";
import Navbar from "../components/Navbar";
import CategoriaProyectos from "../components/CategoriaProyectos";
import { proyectosSimulaciones } from "../pages/Simulaciones"; 
import { proyectosAplicaciones } from "../pages/Appmovil"; 

const Fisica = () => {
    return (
        <div>
            <Navbar />
            <CategoriaProyectos
                titulo="Simulaciones de Física"
                categoria="Fisica"
                proyectos={proyectosSimulaciones}
            />
            <CategoriaProyectos
                titulo="Aplicaciones de Física"
                categoria="Fisica"
                proyectos={proyectosAplicaciones}
            />
        </div>
    );
};

export default Fisica;


