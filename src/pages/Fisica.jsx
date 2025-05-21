import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import CategoriaProyectos from "../components/CategoriaProyectos";
import { useProyectos } from "../context/ProyectoContext";
import { UseSimulaciones } from "../context/SimulacionesContex";
import { useMemo } from "react";


const Fisica = () => {
    const { Proyectos, TraerProyectos } = useProyectos();
    const { Simulaciones, TraerSimulaciones } = UseSimulaciones();

    useEffect(() => {
        TraerProyectos();
        TraerSimulaciones();
    }, []);

    // Obtener simulaciones cuya materia es Física
    const simulacionesFisica = Simulaciones
        .filter(sim => sim.materia?.nombre === "Fisica")
        .map(sim => ({
            nombre: sim.nombre_proyecto,
            imagen: `http://localhost:3000/uploads/${sim.urlimg?.replace(/\\/g, "/").split("uploads/")[1]}`,
            tipo: "Simulación",
            categoria: "Fisica",
            autores: sim.autores,
            descripcion: sim.descripcion,
            _id: sim._id
        }));

    // 📱 Aplicaciones con categoría Física
    const aplicacionesFisica = Proyectos
        .filter(app => app.materia?.nombre === "Fisica")
        .map(app => ({
            nombre: app.nombre_proyecto,
            imagen: `http://localhost:3000/uploads/${app.urlimg?.replace(/\\/g, "/").split("uploads/")[1]}`,
            tipo: "Aplicación",
            categoria: "Fisica",
            autores: app.autores,
            descripcion: app.descripcion,
            _id: app._id
        }));
    
    return (
        <div>
            <Navbar />

            <div className="contenido-proyectos">
                <CategoriaProyectos
                    titulo="Simulaciones de Física"
                    categoria="Fisica"
                    proyectos={simulacionesFisica}
                />


                <CategoriaProyectos
                    titulo="Aplicaciones de Física"
                    categoria="Fisica"
                    proyectos={aplicacionesFisica}
                />
                
            </div>
        </div>
    );
};

export default Fisica;
