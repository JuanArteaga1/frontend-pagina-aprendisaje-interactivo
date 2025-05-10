import React, { useEffect } from "react";
import Navbar from "../components/Navbar"; // Componente de navegación superior
import CategoriaProyectos from "../components/CategoriaProyectos"; // Componente reutilizable para mostrar categorías de proyectos
import { useProyectos } from "../context/ProyectoContext"; // Hook del contexto para acceder y traer proyectos

const Fisica = () => {
    const { Proyectos, TraerProyectos } = useProyectos(); // Obtenemos los proyectos y la función para traerlos

    useEffect(() => {
        // Al montar el componente, se llama a la función para obtener los proyectos
        TraerProyectos();
    }, []);

    // Filtrar los proyectos que son simulaciones y pertenecen a la categoría Física
    const simulacionesFisica = Proyectos.filter(
        p => p.tipo === "Simulación" && p.categoria === "Fisica"
    );

    // Filtrar los proyectos que son aplicaciones y pertenecen a la categoría Física
    const aplicacionesFisica = Proyectos.filter(
        p => p.tipo === "Aplicación" && p.categoria === "Fisica"
    );

    return (
        <div>
            {/* Barra de navegación */}
            <Navbar />

            {/* Sección de simulaciones relacionadas con Física */}
            <CategoriaProyectos
                titulo="Simulaciones de Física"
                categoria="Fisica"
                proyectos={simulacionesFisica}
            />

            {/* Sección de aplicaciones relacionadas con Física */}
            <CategoriaProyectos
                titulo="Aplicaciones de Física"
                categoria="Fisica"
                proyectos={aplicacionesFisica}
            />
        </div>
    );
};

export default Fisica;
